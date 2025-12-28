"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setLoading(true);

    const data = await apiFetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login berhasil");
      router.push("/users");
    } else {
      toast.error(data.error || "Login gagal");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer theme="dark" />

      <div className="border p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

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
          onClick={submitLogin}
          disabled={loading}
          className="bg-black text-white w-full py-2"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
