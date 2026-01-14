"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
  name?: string;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const URL = "/api/proxy/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Username cannot be empty");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "vkEeGJPk4T4LT6QZ5dWaO6so3ofj0gS82jx2uj3L",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password");
        setIsLoading(false);
        return;
      }

      // Success
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/home");

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
