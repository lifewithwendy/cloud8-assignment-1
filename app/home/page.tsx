"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setName(parsed.name || "");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Welcome, {name}!</h1>
    </div>
  );
}
