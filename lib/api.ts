import axios from 'axios';

/**
 * Axios instance configured to point at the backend API.  The base URL is
 * provided via the NEXT_PUBLIC_BACKEND_URL environment variable.  If not set,
 * it defaults to localhost:3000.
 */
export const api = axios.create({
  // When deploying on Vercel with API routes, baseURL can simply be /api
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '/api',
  withCredentials: true,
});
