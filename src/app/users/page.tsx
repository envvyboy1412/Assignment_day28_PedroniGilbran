"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://reqres.in/api/users?page=1",
        {
          method: "GET",
          headers,
        }
      );

      const data = await response.json();
      console.log("API RESPONSE:", data);

      setUsers(data.data);
    } catch (error) {
      console.error("Error fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading users...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>

      <div className="grid grid-rows-4 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 border p-4 rounded"
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
              <div className="text-sm text-gray-600">
                {user.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
