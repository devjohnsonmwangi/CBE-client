// Central place to configure API base URL for the frontend
// Update this value to point to the running backend server always.
const API_DOMAIN = (() => {
  // Read from environment variable first (Vite uses import.meta.env)
  // Fallback to backend default used by the Nest app (port 3000)
  // Prefer Vite env var VITE_API_BASE_URL when running dev/preview.
  const fromEnv = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL;
  return fromEnv || 'http://localhost:8000/api/v1';
})();

export default API_DOMAIN;
