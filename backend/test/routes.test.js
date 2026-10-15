const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("../server");
const { createIssue } = require("../controllers/issueController");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function request(path, options = {}) {
  return fetch(`${baseUrl}${path}`, options);
}

test("health reports database connection state", async () => {
  const response = await request("/api/health");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.database, "disconnected");
});

test("authentication routes validate missing credentials", async () => {
  for (const path of ["/api/auth/login", "/api/auth/register"]) {
    const response = await request(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const body = await response.json();

    assert.equal(response.status, 400, `${path} should reject missing fields`);
    assert.equal(body.success, false);
  }
});

test("authentication routes reject malformed JSON shapes with 400", async () => {
  for (const body of ["null", "[]"]) {
    const response = await request("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    assert.equal(response.status, 400);
  }
});

test("issue creation rejects non-string fields before database access", async () => {
  let statusCode;
  let responseBody;
  const response = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      responseBody = body;
      return this;
    },
  };

  await createIssue({
    body: { title: 12, description: "Description", category: "Waste", location: "Park" },
    user: { _id: "000000000000000000000001" },
  }, response, (error) => { throw error; });

  assert.equal(statusCode, 400);
  assert.equal(responseBody.success, false);
});

test("issue and user routes reject unauthenticated requests", async () => {
  const cases = [
    ["GET", "/api/issues"],
    ["POST", "/api/issues"],
    ["GET", "/api/issues/012345678901234567890123"],
    ["PATCH", "/api/issues/012345678901234567890123"],
    ["DELETE", "/api/issues/012345678901234567890123"],
    ["GET", "/api/users/me"],
    ["PATCH", "/api/users/me"],
    ["GET", "/api/users"],
    ["POST", "/api/users"],
    ["PATCH", "/api/users/012345678901234567890123/status"],
  ];

  for (const [method, path] of cases) {
    const response = await request(path, { method });
    const body = await response.json();

    assert.equal(response.status, 401, `${method} ${path} should require a token`);
    assert.equal(body.success, false);
  }
});

test("unknown routes return a JSON 404", async () => {
  const response = await request("/api/not-a-route");
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.success, false);
});

test("CORS permits local Vite fallback ports", async () => {
  const response = await request("/api/health", {
    headers: { Origin: "http://localhost:5174" },
  });

  assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:5174");
});