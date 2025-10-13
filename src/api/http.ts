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

  const res = await fetch(url, { ...opts, headers });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const error = new Error((data && data.message) || res.statusText);
    (error as any).status = res.status;
    (error as any).data = data;
    throw error;
  }

  return data as T;
}

export { http, getTokenFromStorage };
