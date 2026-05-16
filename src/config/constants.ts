/**
 * Application constants
 * Central place for app-wide constants and configuration
 */

export const APP_NAME = 'NexTask';
export const APP_VERSION = '0.1.0';

export const API_ENDPOINTS = {
  BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  HEALTH: '/api/health',
} as const;

export const ENVIRONMENT = {
  DEV: 'development',
  PROD: 'production',
  STAGING: 'staging',
} as const;

export const CURRENT_ENV = (process.env.NODE_ENV as keyof typeof ENVIRONMENT) || 'development';
