import { baseApi } from "../config/baseApi";
import { authLoginUrl } from "../config/paths";

export async function useFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${baseApi}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = authLoginUrl;
      alert("Login expired");
    } else if (response.status === 403) {
      alert("You don not have access to perform this operation");
      window.location.href = "/";
      return;
    } else if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error("Error occurred", error);
  }
}
