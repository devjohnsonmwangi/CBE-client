// Central place to configure API base URL for the frontend
// Update this value to point to the running backend server always.
const API_DOMAIN = (() => {
  const fromEnv =
    typeof import.meta !== 'undefined' &&
    (import.meta as any).env?.VITE_API_BASE_URL
  return fromEnv || 'http://localhost:3000/api/v1'
})()

export default API_DOMAIN
