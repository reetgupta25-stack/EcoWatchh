# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# EcoWatch

EcoWatch is a React/Vite application backed by an Express 5 API and MongoDB via Mongoose. The API provides authentication, role-based issue workflows, user management, profile updates, and a database health endpoint.

## Requirements

- Node.js 20 or newer and npm
- A reachable MongoDB database (MongoDB Atlas or a local MongoDB server)

## Environment

Copy `backend/.env.example` to `backend/.env` and set:

- `MONGO_URI`: MongoDB connection string. For Atlas, allowlist the machine's public IP in Network Access.
- `JWT_SECRET`: a unique random secret; generate one with `openssl rand -hex 32`.
- `PORT`: API port, normally `5000`.
- `CLIENT_URL`: browser origin allowed by the API, normally `http://localhost:5173`. Multiple origins can be comma-separated.

The optional root `.env.example` documents Vite proxy configuration. `VITE_BACKEND_URL` defaults to `http://localhost:5000`. Set `VITE_API_URL` only when the browser should call a separately hosted API URL directly; otherwise leave it unset to use Vite's `/api` proxy in development.

Never commit `.env` files. If credentials have been committed or shared, rotate the database password and JWT secret; removing a file from the latest commit does not remove it from Git history.

## Install

```sh
npm ci
npm ci --prefix backend
```

## Create the first administrator

Set `BOOTSTRAP_ADMIN_NAME`, `BOOTSTRAP_ADMIN_EMAIL`, and `BOOTSTRAP_ADMIN_PASSWORD` in the backend process environment, then run:

```sh
npm run create-admin --prefix backend
```

The password must be at least 8 characters. The script does not create a built-in account, print credentials, or change an existing non-admin account's role. After bootstrapping, admins can create citizen, worker, supervisor, and admin accounts from User Management.

## Run locally

In one terminal, start the API:

```sh
npm run dev --prefix backend
```

In a second terminal, start Vite:

```sh
npm run dev
```

Open the URL printed by Vite. The API starts only after MongoDB connects; then `http://localhost:5000/api/health` reports `database: "connected"`. If startup fails, inspect the backend terminal for the MongoDB connection error. If Vite selects a different port, set `CLIENT_URL` to that exact origin when restricting CORS.

## Checks

```sh
npm run lint
npm run build
find backend -path '*/node_modules' -prune -o -name '*.js' -print | xargs -r -n1 node --check
npm audit --prefix backend --omit=dev
```

There is no automated test suite in the repository yet. Database-backed flows require a reachable MongoDB instance and valid role accounts.
