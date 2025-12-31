"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (authorized) {
      getUsers();
    }
  }, [authorized]);

  const getUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers,
      });
      const data = await response.json();
      setUsers(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (!authorized || loading) {
    return <div className="p-10">Loading users...</div>;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/users/${user.id}`)}
            className="flex items-center gap-4 border p-4 rounded cursor-pointer hover:bg-cyan-50"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-16 h-16 rounded-full"
            />

            <div>
              <div className="font-semibold">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
