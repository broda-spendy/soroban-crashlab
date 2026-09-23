import { NextResponse } from 'next/server';
import { successResponse, errorResponse, status } from './api-response-utils';

export async function tryBackend(
  backendUrl: string | undefined,
  path: string,
  options: RequestInit,
  fallback: () => Promise<NextResponse> | NextResponse,
): Promise<NextResponse> {
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}${path}`, {
        ...options,
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        return successResponse(data);
      }
      // Preserve upstream error body instead of generic message
      let errorBody: string | object = `Upstream error (${res.status})`;
      try {
        errorBody = await res.json();
      } catch {
        try {
          errorBody = await res.text();
        } catch {
          // Fall back to generic message
        }
      }
      return errorResponse(errorBody, res.status);
    } catch {
      return errorResponse('Backend unavailable', status.serviceUnavailable);
    }
  }
  return fallback();
}
