# Frontend deployment

The React frontend can be hosted as a static site. The Express backend and MongoDB must be hosted separately for login, signup, and note storage to work online.

1. Deploy the backend with a hosted MongoDB connection and an environment-based JWT secret (the current backend is configured for local development).
2. Set `REACT_APP_API_URL` to your HTTPS backend origin, such as `https://your-api.example.com`. Do not append `/api`. Never put database credentials or JWT secrets in a `REACT_APP_` variable.
3. Run `npm ci` and `npm run build`. Publish `build/` and route frontend URLs back to `index.html`.
4. On Vercel, import this repository, use the repository root, and add `REACT_APP_API_URL` before building. The included `vercel.json` configures the frontend build and routing; it does not deploy `BACKEND/`.

Without a configured production API URL, the deployed frontend explicitly shows a preview notice and disables account submissions. Local development continues to use `http://localhost:5000`.

## Local use

Run the backend and MongoDB as before, then run `npm start` in the repository root. The UI preserves the existing token and API endpoints. Tags now use the backend's actual `tags` field.
