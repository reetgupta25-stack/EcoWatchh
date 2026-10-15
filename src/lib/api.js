const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, method = "GET", signal } = options;
  const requestHeaders = new Headers(headers);
  const token = sessionStorage.getItem("ecowatchToken");

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token && !requestHeaders.has("Authorization")) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body === undefined
      ? undefined
      : body instanceof FormData
        ? body
        : JSON.stringify(body),
    signal,
  });
  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    sessionStorage.removeItem("ecowatchToken");
    sessionStorage.removeItem("ecowatchUser");
  }

  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }

  return data;
}