"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
  const [callBooked, setCallBooked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lp_call_booked");
      if (stored === "true") setCallBooked(true);
    }
  }, []);

  const handleBookCall = () => {
    if (callBooked) return;
    window.open("https://boostwithlaunchpad.com", "_blank");
    setCallBooked(true);
    localStorage.setItem("lp_call_booked", "true");
  };

  return (
    <>
      {/* ── Minimal Header (logo only) ───────────────────── */}
      <header className="h-[80px] bg-white border-b border-[#F1F5F9] fixed top-0 left-0 w-full z-[1000]">
        <div className="max-w-[1200px] mx-auto px-8 h-full flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/launchpad_boost_logo.svg"
              alt="Launchpad Boost"
              width={220}
              height={44}
              className="h-[44px] w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[80px]" />

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-16 px-8">
        <div className="max-w-[600px] w-full flex flex-col items-center text-center">
          {/* Green Checkmark */}
          <div className="w-[72px] h-[72px] rounded-full bg-[#DCFCE7] flex items-center justify-center mb-8">
            <svg
              className="w-9 h-9 text-[#16A34A]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            You&rsquo;re All Set!
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-[480px]">
            Thank you for reaching out to Launchpad Boost. We&rsquo;re excited
            to help your business grow and look forward to connecting with you.
          </p>

          {/* ── Account Manager Info Box ──────────────────── */}
          <div className="w-full rounded-2xl bg-[#7C3AED]/5 border border-[#7C3AED]/20 p-6 md:p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg
                className="w-6 h-6 text-[#7C3AED]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <h2 className="text-lg font-bold text-[#7C3AED]">
                Your Dedicated Account Manager
              </h2>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              A dedicated account manager has been assigned to your inquiry and
              will reach out shortly to introduce themselves, learn about your
              business, and start building your custom growth plan.
            </p>
          </div>

          {/* ── What Happens Next Card ────────────────────── */}
          <div className="w-full rounded-2xl bg-white border border-[#F1F5F9] shadow-sm p-6 md:p-8 mb-10 text-left">
            <h3 className="text-xl font-bold text-[#1E293B] mb-6 text-center">
              What happens next:
            </h3>

            <div className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">
                    We review your information
                  </h4>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    Our team reviews your submission and matches you with the
                    right account manager based on your industry and goals.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">
                    We request access to your accounts
                  </h4>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    Your account manager will reach out to request read-only
                    access to your Google Business Profile, ad accounts, and
                    analytics so we can perform a full audit.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">
                    Your first report in 7 days
                  </h4>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    Within 7 days you&rsquo;ll receive a detailed report
                    covering your current performance, opportunities we&rsquo;ve
                    identified, and a recommended action plan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Book a Call Button ─────────────────────────── */}
          <button
            onClick={handleBookCall}
            disabled={callBooked}
            className={`inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-base transition-all ${
              callBooked
                ? "bg-[#DCFCE7] text-[#16A34A] cursor-default"
                : "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white hover:from-[#6D28D9] hover:to-[#5B21B6] shadow-lg shadow-[#7C3AED]/25"
            }`}
          >
            {callBooked ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Call Booked
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Book a Google Meet Call
              </>
            )}
          </button>
        </div>
      </main>
    </>
  );
}
