const isLocalhost = window.location.hostname === "localhost";

const API_BASE_URL = isLocalhost
  ? import.meta.env.VITE_API_BASE_LOCAL
  : import.meta.env.VITE_API_BASE_PROD;

export async function predictFromText(text) {
  const res = await fetch(`${API_BASE_URL}/predict/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return await res.json();
}

export async function predictFromURL(url) {
  const res = await fetch(`${API_BASE_URL}/predict/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  return await res.json();
}
