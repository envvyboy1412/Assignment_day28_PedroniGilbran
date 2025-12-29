"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${id}`,
        {
          method: "GET",
          headers,
        }
      );
      const data = await response.json();
      setUser(data.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading user...</div>;
  }

  if (!user) {
    return <div className="p-10">User not found</div>;
  }

  return (
    <div className="p-10">
      <button
        onClick={() => router.back()}
        className="mb-6 cursor-pointer text-blue-600"
      >
        ← Back
      </button>

      <div className="flex items-center gap-6 border p-4 rounded">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-24 h-24 rounded-full"
        />

        <div>
          <div className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </div>
          <div className="text-gray-600">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
