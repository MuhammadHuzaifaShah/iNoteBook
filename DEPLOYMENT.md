# Deploy the complete iNoteBook app

The Render Blueprint in `render.yaml` hosts React and Express together. MongoDB Atlas provides the database. The current private frontend preview is separate and does not automatically change when you deploy this service.

1. Push the supplied patches to your GitHub repository.
2. Create a MongoDB Atlas database and database user. Set its network access to allow your Render service's outbound IP ranges. Use Atlas's Drivers connection string with the database name `inotebook` and URL-encode special characters in the password.
3. In Render, choose New > Blueprint and connect this repository.
4. Enter the Atlas connection string as the secret `MONGODB_URI`. The Blueprint generates `JWT_SECRET` and supplies all other build settings.
5. Deploy, wait for the health check to pass, then open the resulting Render URL. Create an account and verify creating, editing, and deleting a note.

Do not commit database credentials or JWT secrets. Store them in your hosting environment. Existing local MongoDB notes are not automatically copied to Atlas.

## Manual Render settings

- Repository root: leave blank
- Build: `npm ci --include=dev && npm ci --prefix BACKEND --omit=dev && npm run build`
- Start: `node BACKEND/index.js`
- Health check: `/health`
- `NODE_ENV`: `production`
- `REACT_APP_API_URL`: `same-origin`
- `MONGODB_URI`: your Atlas connection string
- `JWT_SECRET`: a cryptographically random value of at least 32 characters

The server waits for MongoDB before listening, uses the host-provided port, serves React routes, and returns API errors as JSON. Authentication tokens expire after seven days. Without JWT_SECRET in local development, a temporary secret is generated per server start, so log in again after restarting.

## Separate frontend hosting

For Vercel or the private preview, set `REACT_APP_API_URL` to the HTTPS backend origin before building. Set `FRONTEND_URL` on the backend to the frontend's exact origin. The included `vercel.json` hosts only the frontend.

## Local development

Start MongoDB, run `npm ci` in the root and `npm ci --prefix BACKEND`, then run `npm run both`. The default local API is `http://localhost:5000` and MongoDB is `mongodb://127.0.0.1:27017/inotebook`. Set backend environment variables through your shell; `.env` files are not loaded automatically.
