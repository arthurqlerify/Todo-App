import { z } from "zod";

// Define a schema for API errors based on OpenAPI BadRequest/NotFound responses
const errorSchema = z.object({
  message: z.string(),
});

type ErrorResponse = z.infer<typeof errorSchema>;

const API_BASE_URL = "/api/v1";

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  body?: unknown,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    let errorData: ErrorResponse = { message: "An unexpected error occurred." };
    try {
      const parsedError = await response.json();
      errorData = errorSchema.parse(parsedError);
    } catch (e) {
      // If response is not JSON or doesn't match error schema, use generic message
      console.error("Failed to parse error response:", e);
    }
    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
  }

  // Handle cases where the response might be 204 No Content
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return null as T; // Explicitly return null for no-content
  }

  return response.json();
}

export const api = {
  get: <T>(path: string, params?: Record<string, string>) => request<T>("GET", path, undefined, params),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  delete: <T>(path: string, body?: unknown) => request<T>("DELETE", path, body),
};