/**
 * Server utilities and API helpers
 * This module contains utilities for server-side operations
 */

export async function getServerTimestamp(): Promise<string> {
  return new Date().toISOString();
}

/**
 * Health check response type
 */
export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
}
