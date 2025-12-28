"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    setLoading(true);

    const data = await apiFetch("https://reqres.in/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      toast.success("Berhasil Register");
    } else {
      toast.error(data.error || "Gagal Register");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer theme="dark" />

      <div className="border p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          placeholder="Email"
          className="border w-full mb-3 px-3 py-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submitRegister}
          disabled={loading}
          className="bg-blue-700 text-white w-full py-2"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
    </div>
  );
}
