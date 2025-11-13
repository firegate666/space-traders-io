export const API_URL = 'https://api.spacetraders.io/v2';

export interface ApiError {
  error: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export const isApiError = (value: unknown): value is ApiError =>
  Boolean(value) && typeof value === 'object' && 'error' in (value as Record<string, unknown>);

export async function apiFetch<TResponse>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<TResponse> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw data as ApiError;
  }

  return data as TResponse;
}
