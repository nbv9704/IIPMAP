// src/lib/api/apiClient.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type ApiOptions = {
  auth?: boolean; // true = gắn Authorization: Bearer <token>
};

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export async function apiPost<TRequest, TResponse>(
  path: string,
  body: TRequest,
  options: ApiOptions = {}
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let errorMessage = "Đã xảy ra lỗi, vui lòng thử lại";
    try {
      const errBody = await res.json();
      errorMessage = errBody.message || errorMessage;
    } catch {
      // ignore parse error
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
