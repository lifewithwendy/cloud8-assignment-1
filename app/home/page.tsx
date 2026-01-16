"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
      return;
    }
    const parsed = JSON.parse(user);

    if (parsed.expiry && new Date().getTime() > parsed.expiry) {
      localStorage.removeItem("user");
      router.push("/");
      return;
    }

    setName(parsed.name || "");
  }, [router]);

  const handleLogout = () => {
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
