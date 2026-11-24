# Aura Store

A responsive storefront with a React/Vite frontend, Express API, and MongoDB-backed accounts and orders.

## Run locally

1. Start MongoDB locally, or use a MongoDB Atlas connection string.
2. In `server`, copy `.env.example` to `.env`. Set `MONGODB_URI` and a long random `JWT_SECRET`. Keep `.env` private; it is gitignored.
3. Install dependencies in the repository root with `npm install`. The `client` and `server` package files are also retained for standalone local development.
4. Seed the 62 sample products with `npm run seed` from `server`.
5. Start the API with `npm run dev` from `server`.
6. Start the storefront with `npm run dev` from `client`, then open the Vite URL it prints (usually `http://localhost:5173`).

The local Vite server proxies `/api` requests to Express on port `5000`. Registration and login store accounts in MongoDB and hash passwords with bcrypt.

## Deploy to Vercel

Import the repository into Vercel with the repository root as the project root. Vercel builds the Vite client and serves the Express API from a function in the same project. The SPA rewrite supports direct links to storefront pages.

Add these environment variables in the Vercel project settings for **Production** and **Preview**:

- `MONGODB_URI` — a MongoDB Atlas connection URI. A local `mongodb://localhost:27017` URI will not work on Vercel.
- `JWT_SECRET` — a long random secret used to sign login tokens. Do not commit either value or put them in frontend `VITE_` variables.

After setting the variables, redeploy and seed the 62 products into Atlas by running `npm run seed` in `server` with `MONGODB_URI` set in your local environment. User accounts and orders are stored in that same Atlas database.
