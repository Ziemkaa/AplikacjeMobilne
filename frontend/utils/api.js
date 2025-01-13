export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) {
    console.error(`Request to ${url} failed with status ${res.status}`);
    return [];
  }
  return await res.json();
}
