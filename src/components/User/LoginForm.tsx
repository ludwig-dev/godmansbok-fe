import React, { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Du logga in!");
          // Redirect to clients page after successful login
          navigate({ to: "/clients" });
        },
        onError: (error) => {
          // Handle error, e.g., show a toast notification
          toast.error(error?.response.data || "Login misslyckades");
        },
      }
    );
  };

  const errorMessage = loginMutation.error?.response.data;
  console.log("Login error:", errorMessage);
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log in</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
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
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
