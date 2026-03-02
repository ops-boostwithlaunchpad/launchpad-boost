"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SubscribePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/clients/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("client_session", JSON.stringify(data));
      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* ── Fixed Header ── */}
      <header className="h-[64px] bg-white border-b border-[#F1F5F9] fixed top-0 left-0 w-full z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center">
          <Link href="/">
            <Image
              src="/launchpad_boost_logo.svg"
              alt="Launchpad Boost"
              width={180}
              height={36}
              className="h-[36px] w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* ── Login Card ── */}
      <main className="flex-1 flex items-center justify-center pt-[64px] px-4 py-12">
        <div
          className="w-full max-w-[440px] rounded-2xl p-8 sm:p-10 shadow-xl border border-white/10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 50%, #FFFFFF 100%)",
          }}
        >
          {/* Card Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/launchpad_boost_logo.svg"
              alt="Launchpad Boost"
              width={160}
              height={32}
              className="h-[32px] w-auto"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-[#0F172A] mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#64748B] text-center mb-8">
            Sign in to access your SEO dashboard and reports.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-sm rounded-lg px-4 py-3 mb-6 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Client Name */}
            <div>
              <label
                htmlFor="client-name"
                className="block text-sm font-medium text-[#1E293B] mb-1.5"
              >
                Client Name
              </label>
              <input
                id="client-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your business name"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm placeholder-[#94A3B8] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="client-password"
                  className="block text-sm font-medium text-[#1E293B]"
                >
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="client-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm placeholder-[#94A3B8] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm tracking-wide transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Not a client */}
          <p className="text-sm text-center text-[#64748B]">
            Not a client yet?{" "}
            <Link
              href="/contact"
              className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </main>

      {/* ── Trust Footer ── */}
      <footer className="py-6 text-center">
        <p className="text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-[#7C3AED]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secured by Launchpad Boost
        </p>
      </footer>
    </div>
  );
}
