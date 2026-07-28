# Aura Store

Full-stack e-commerce starter with a React/Vite client and Express/MongoDB API.

## Run locally

1. In `server`, copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies in both folders: `npm install`.
3. Seed products with `npm run seed` from `server`.
4. Run the API with `npm run dev` in `server` and the UI with `npm run dev` in `client`.

The client expects the API at `http://localhost:5000/api`; override this with `VITE_API_URL` if needed.
