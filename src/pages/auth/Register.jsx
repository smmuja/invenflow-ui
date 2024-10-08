import { Form, useActionData } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

import { baseApi } from "../../config/baseApi";
import { authLoginUrl, authRegisterUrl } from "../../config/paths";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${baseApi}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    alert("Successfully registered");
    return { success: true };
  } else {
    const errorResponse = await response.json();
    return { error: errorResponse.message || "Failed to register" };
  }
}

export function RegisterPage() {
  const actionData = useActionData();

  if (actionData?.success) {
    return <Navigate to={authLoginUrl} />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-black text-center">Register</h2>
          {actionData?.error && (
            <p className="text-red-500 text-sm">
              Failed to register: <br /> {actionData.error}
            </p>
          )}
          <Form method="post" action={authRegisterUrl}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
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
                Register
              </button>
            </div>
          </Form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to={authLoginUrl} className="text-blue-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
