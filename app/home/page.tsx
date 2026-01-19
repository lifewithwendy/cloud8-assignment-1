"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  name: string;
  exp: number;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      
      // Check expiration (exp is in seconds)
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
        return;
      }

      // Use name from token, or fallback to stored user object
      let tempName = decoded.name;
      if (!tempName && userStr) {
          const parsed = JSON.parse(userStr);
          tempName = parsed.name;
      }
      
      setName(tempName || "User");
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Welcome, {name}!</h1>
      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
