import { baseApi } from "../config/baseApi";
import { useAuth } from "../context/AuthContext";
import { Link, Form, useActionData, Navigate } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${baseApi}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!email) {
    return { error: "Provide a valid email" };
  }

  if (response.ok) {
    const { token, user } = await response.json();
    return { token, user };
  } else {
    return { error: "Failed to login. Check your credentials" };
  }
}

export function LoginPage() {
  const actionData = useActionData();
  const { login } = useAuth();

  if (actionData?.token) {
    const userInfo = {
      _id: actionData.user._id,
      username: actionData.user.username,
      email: actionData.user.email,
    };
    localStorage.setItem("token", actionData.token);
    login(actionData.token, userInfo);
    return <Navigate to="/dashboard/products" />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-black text-center">Login</h2>
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}

          <Form method="post" action="/login">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button className="w-full bg-blue-500 px-4 py-2 rounded-md text-white">
                Login
              </button>
            </div>
          </Form>
          <p className="text-center">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-900">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
