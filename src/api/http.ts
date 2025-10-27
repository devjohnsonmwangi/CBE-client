import API_DOMAIN from '../apidomain';

type RequestOptions = RequestInit & { token?: string };

function getTokenFromStorage(): string | null {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    return null;
  }
}

async function http<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_DOMAIN.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string> || {}),
  };

  const token = opts.token ?? getTokenFromStorage();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Ensure cookies (refresh token) are sent/received for cross-site auth flows
  const fetchOpts: RequestInit = {
    credentials: 'include',
    ...opts,
    headers,
  };

  const res = await fetch(url, fetchOpts);

  const text = await res.text();
  let data: any = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch (err) {
      // Not JSON — keep raw text under data.__raw to aid debugging
      data = { __raw: text }
    }
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || data?.__raw || `HTTP ${res.status}`
    const error: any = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }

  return data as T
}

export { http, getTokenFromStorage };
