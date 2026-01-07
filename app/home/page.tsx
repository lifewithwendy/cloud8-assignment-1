"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name?: string;
  email?: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/");
    } else {
      setUser(JSON.parse(storedUser) as User);
    }
  }, [router]);

  const logout = (): void => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-10 shadow-md text-center">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Welcome {user.name || user.email}
        </h2>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
