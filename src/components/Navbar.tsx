"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const calendlyUrl = "https://calendly.com/ops-boostwithlaunchpad/30min";

  const openCalendly = () => {
    const win = window as unknown as Record<string, { initPopupWidget: (opts: { url: string }) => void }>;
    if (win.Calendly) {
      win.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  return (
    <header className="h-[80px] bg-white border-b border-[#F1F5F9] fixed top-0 left-0 w-full z-[1000]">
      <div className="max-w-[1200px] mx-auto px-8 h-full flex justify-between items-center relative">
        <Link href="/" className="flex items-center z-[1001]">
          <Image
            src="/launchpad_boost_logo.svg"
            alt="Launchpad Boost"
            width={220}
            height={44}
            className="h-[44px] w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/admin" className="font-medium text-[#64748B] text-[0.95rem] hover:text-[#7C3AED]">
            Admin
          </Link>
          <Link href="/features" className="font-medium text-[#64748B] text-[0.95rem] hover:text-[#7C3AED]">
            Services
          </Link>
          <Link href="/reviews" className="font-medium text-[#64748B] text-[0.95rem] hover:text-[#7C3AED]">
            Reviews
          </Link>
          <Link href="/requests" className="font-medium text-[#64748B] text-[0.95rem] hover:text-[#7C3AED]">
            Requests
          </Link>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={openCalendly}
          className="hidden md:inline-flex btn btn-primary"
        >
          Get Started
        </button>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-11 h-11 bg-transparent border-none cursor-pointer z-[1003]"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-[#1E293B] rounded my-[3px] transition-all ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E293B] rounded my-[3px] transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E293B] rounded my-[3px] transition-all ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white flex flex-col items-center pt-8 z-[1001] border-t border-[#E2E8F0]">
            <Link
              href="/admin"
              className="w-full py-5 px-8 text-center text-lg font-medium text-[#1E293B] border-b border-[#F1F5F9]"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="/features"
              className="w-full py-5 px-8 text-center text-lg font-medium text-[#1E293B] border-b border-[#F1F5F9]"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/reviews"
              className="w-full py-5 px-8 text-center text-lg font-medium text-[#1E293B] border-b border-[#F1F5F9]"
              onClick={() => setMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="/requests"
              className="w-full py-5 px-8 text-center text-lg font-medium text-[#1E293B] border-b border-[#F1F5F9]"
              onClick={() => setMenuOpen(false)}
            >
              Requests
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                openCalendly();
              }}
              className="btn btn-primary w-[85%] max-w-[320px] mt-8 justify-center"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
