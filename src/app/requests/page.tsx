"use client";

import { useState, useEffect, ChangeEvent } from "react";

interface Submission {
  businessName: string;
  email: string;
  serviceType: string;
  meetEnabled: boolean;
  receivedOn: string;
}

export default function RequestsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const CORRECT_PIN = "1212";

  /* ── Load submissions from localStorage once authenticated ── */
  useEffect(() => {
    if (!authenticated) return;

    try {
      const raw = localStorage.getItem("launchpad_submissions");
      if (raw) {
        setSubmissions(JSON.parse(raw));
      }
    } catch {
      setSubmissions([]);
    }
  }, [authenticated]);

  /* ── PIN handler ── */
  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    if (pinError) setPinError("");
  };

  const handleUnlock = () => {
    if (pin === CORRECT_PIN) {
      setAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setPin("");
    setPinError("");
    setSubmissions([]);
  };

  /* ── Auth Panel ── */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4">
        <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-8 sm:p-10 text-center">
          {/* Key Icon */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#F5F3FF] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#7C3AED]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[#64748B] mb-8">
            Enter your 4-digit PIN to access client requests.
          </p>

          {/* PIN Input */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={handlePinChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUnlock();
            }}
            placeholder="----"
            className="w-[180px] mx-auto block text-center text-4xl font-mono font-bold tracking-[0.5em] py-3 border-2 border-[#E2E8F0] rounded-xl bg-[#F8FAFC] text-[#0F172A] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 placeholder-[#CBD5E1]"
          />

          {/* Error */}
          {pinError && (
            <p className="text-sm text-[#DC2626] mt-3">{pinError}</p>
          )}

          {/* Unlock Button */}
          <button
            onClick={handleUnlock}
            disabled={pin.length < 4}
            className="mt-6 w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm tracking-wide transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock Now
          </button>
        </div>
      </div>
    );
  }

  /* ── Dashboard Panel ── */
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#0F172A]">
            Client Requests
          </h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#64748B] hover:text-[#DC2626] hover:border-[#FECACA] transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Table */}
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-16 text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#94A3B8]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>
            <p className="text-[#64748B] text-sm">
              No submissions yet. Client requests will appear here once received.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Received On
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Meet Access
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#64748B] text-xs uppercase tracking-wider">
                      Internal Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
                    >
                      {/* Received On */}
                      <td className="px-6 py-4 text-[#1E293B] whitespace-nowrap">
                        {sub.receivedOn
                          ? new Date(sub.receivedOn).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "--"}
                      </td>

                      {/* Business Name */}
                      <td className="px-6 py-4 font-medium text-[#0F172A] whitespace-nowrap">
                        {sub.businessName || "--"}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-[#64748B] whitespace-nowrap">
                        {sub.email || "--"}
                      </td>

                      {/* Service Type */}
                      <td className="px-6 py-4 text-[#1E293B] whitespace-nowrap">
                        {sub.serviceType || "--"}
                      </td>

                      {/* Meet Access Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.meetEnabled ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#166534]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#64748B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" />
                            Locked
                          </span>
                        )}
                      </td>

                      {/* Internal Action */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.meetEnabled ? (
                          <button className="px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold transition-all cursor-pointer">
                            Schedule Now
                          </button>
                        ) : (
                          <span className="inline-block px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#94A3B8] text-xs font-semibold">
                            Awaiting Link
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
