/**
 * API client configuration
 * Setup for fetch requests with sensible defaults
 */

export const API_CONFIG = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Fetch wrapper with timeout and error handling
 */
export async function apiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
  const url = `${baseUrl}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}
