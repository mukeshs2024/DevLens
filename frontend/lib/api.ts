const BASE_URL = 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithConfig(endpoint: string, config: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  if (!response.ok) {
    let message = 'An error occurred while fetching the data.';
    try {
      const errorData = await response.json();
      message = errorData.detail || message;
    } catch (e) {
      message = response.statusText;
    }
    throw new ApiError(response.status, message);
  }

  return response.json();
}

export const api = {
  // Analyze
  analyze: (data: { repository_url: string; branch: string; logs: string; issue_description?: string }) => 
    fetchWithConfig('/analyze/', { method: 'POST', body: JSON.stringify(data) }),

  // History
  getHistory: () => fetchWithConfig('/history/'),
  getHistoryById: (id: string) => fetchWithConfig(`/history/${id}`),
  deleteHistory: (id: string) => fetchWithConfig(`/history/${id}`, { method: 'DELETE' }),

  // Repositories
  getRepositories: () => fetchWithConfig('/repositories/'),
  addRepository: (repo: any) => fetchWithConfig('/repositories/', { method: 'POST', body: JSON.stringify(repo) }),
  deleteRepository: (id: string) => fetchWithConfig(`/repositories/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: () => fetchWithConfig('/settings/'),
  updateSettings: (settings: any) => fetchWithConfig('/settings/', { method: 'PUT', body: JSON.stringify(settings) }),
};
