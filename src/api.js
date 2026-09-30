const configuredHost = process.env.REACT_APP_API_URL;
export const apiAvailable = Boolean(configuredHost) || process.env.NODE_ENV !== 'production';
const host = (configuredHost || 'http://localhost:5000').replace(/\/$/, '');

export async function request(path, { method = 'GET', body, authenticated = true } = {}) {
  if (!apiAvailable) throw new Error('The online notebook is not connected yet. Please try again once the server is available.');
  let response;
  try {
    response = await fetch(`${host}/api${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(authenticated ? { 'auth-token': localStorage.getItem('token') || '' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error('Unable to reach the server. Check your connection and try again.');
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || data?.errors?.[0]?.msg || 'Something went wrong. Please try again.');
  return data;
}
