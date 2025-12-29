"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";

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
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer theme="dark" />

      <div className=" border p-6 rounded-2xl w-90">
        <p className="font-extrabold text-center text-xl py-4">
          Create An Account
        </p>
        <p className="text-center pb-4">
          Start your 30 - day free trial. No Credit card required
        </p>

        <div className="my-4">
          <p className="font-bold py-2">Email Address</p>
          <input
            placeholder="name@company.com"
            className="border w-full mb-3 px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-4">
          <p className="font-bold py-2">Password</p>
          <input
            type="password"
            placeholder="Create a password"
            className="border w-full mb-4 px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={submitRegister}
          disabled={loading}
          className="cursor-pointer bg-black text-white w-full py-2"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </div>
    </div>
    </>
  );
}
