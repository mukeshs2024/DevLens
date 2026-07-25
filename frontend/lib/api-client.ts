// lib/api-client.ts
// Axios or fetch wrapper can be implemented here. We will use a fetch wrapper for Next.js.
export const apiClient = {
  get: async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
  post: async (url: string, body: BodyInit | null | undefined) => {
    const res = await fetch(url, {
      method: 'POST',
      body,
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
};
