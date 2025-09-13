import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/login.png";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: real signup logic
    console.log(form);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transform: "scale(0.92)",
        transformOrigin: "center center",
        borderRadius: "10px",
      }}
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-teal-300 overflow-hidden px-4"
    >
      <div className="z-10 w-full max-w-sm p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-300">
        <h2 className="text-2xl font-bold text-teal-700 text-center">
          Create Account
        </h2>
        <p className="mt-1 text-center text-sm text-teal-600">
          Sign up for your KhataMate ledger
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              className="absolute left-4 top-2 text-xs text-teal-500 transition-all
                              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                              peer-focus:top-2 peer-focus:text-xs"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              className="absolute left-4 top-2 text-xs text-teal-500 transition-all
                              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                              peer-focus:top-2 peer-focus:text-xs"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              className="absolute left-4 top-2 text-xs text-teal-500 transition-all
                              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                              peer-focus:top-2 peer-focus:text-xs"
            >
              Confirm password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
