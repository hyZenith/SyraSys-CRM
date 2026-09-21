import { createAuthClient } from "better-auth/react";

// baseURL should point to the root of the API server (not /api).
// Better Auth appends /api/auth/* internally.
const apiBase = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "http://localhost:4000/api";

// Strip trailing /api so we get the server root: http://localhost:4000
const serverBase = apiBase.replace(/\/api\/?$/, "");

export const authClient = createAuthClient({
  baseURL: serverBase,
});
