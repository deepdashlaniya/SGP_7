import { signOut } from "next-auth/react";

import { getServerSessionData } from "./hook/getServerSession";

export async function apiInstance<T>(
  url: string,
  options: RequestInit = {},
  type: "multipart/form-data" | "application/json" = "application/json"
): Promise<T> {
  const session: any = await getServerSessionData();

  const token = session?.user?.data?.authToken;

  const newOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      "Content-Type": type,
    },
  };

  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      newOptions
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        signOut();
      }
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something Went Wrong");
  }
}
