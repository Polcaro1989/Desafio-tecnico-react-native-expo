import { MOCK_API_URL } from "@/shared/backend-mock";

const API_BASE_URL = `${MOCK_API_URL}/api`;

interface ApiErrorPayload {
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json()) as T | ApiErrorPayload;

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "error" in payload
        ? payload.error || "Erro inesperado ao consultar a API."
        : "Erro inesperado ao consultar a API.";

    throw new ApiError(message, response.status);
  }

  return payload as T;
}
