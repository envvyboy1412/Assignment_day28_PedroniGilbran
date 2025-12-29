"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import Link from "next/link";

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
    <>
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer theme="dark" />

      <div className="border p-6 rounded-2xl w-90">
        <h1 className="text-center text-black text-2xl py-4 font-extrabold">Welcome Back</h1>
        <p className="text-center text-black-50 p-4">please enter your details to sign in</p>

        <div className="my-4">
        <p className="font-bold py-2">Email Address</p>
        <input
          placeholder="Enter Your Email"
          className="border w-full mb-3 px-3 py-2 rounded-sm"
          onChange={(e) => setEmail(e.target.value)} 
        />
        </div>

        <div className="my-4">
        <p className="font-bold py-2">Password</p>
        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 px-3 py-2 rounded-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <div className="my-4">
        <button
          onClick={submitLogin}
          disabled={loading}
          className="cursor-pointer bg-black text-white w-full py-2"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        </div>

                <div className="text-center text-sm mt-4">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 font-semibold text-black hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
