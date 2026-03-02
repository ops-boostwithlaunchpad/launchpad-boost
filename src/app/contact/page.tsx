"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/success");
    } catch {
      setSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How quickly will I see results?",
      a: "Most clients see measurable improvements within 30-60 days for paid ads and 60-90 days for SEO. We set clear expectations during onboarding and provide weekly progress updates so you always know where things stand.",
    },
    {
      q: "Am I locked into a long-term contract?",
      a: "No. We offer flexible month-to-month agreements. We believe our results speak for themselves, so there is no need to lock you in. You stay because it is working, not because of a contract.",
    },
    {
      q: "Can I combine multiple services?",
      a: "Absolutely. In fact, we recommend it. Combining SEO with paid ads creates a compounding effect — organic growth lowers your long-term cost per lead while ads deliver immediate traffic. We will build a custom package that fits your goals and budget.",
    },
    {
      q: "What industries do you work with?",
      a: "We specialize in local and service-based businesses — home services, healthcare, legal, real estate, fitness, automotive, and more. If you serve customers in a specific area, our strategies are built for you.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-[#64748B] max-w-[680px] mx-auto leading-relaxed">
            Have a question or ready to grow your business? Reach out and our
            team will get back to you within one business day.
          </p>
        </div>
      </section>

      {/* ── Info Cards ─────────────────────────────────────── */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Us */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9] text-center">
              <div className="w-14 h-14 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-7 h-7 text-[#7C3AED]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5-9.75-6.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                Email Us
              </h3>
              <a
                href="mailto:support@boostwithlaunchpad.com"
                className="text-[#7C3AED] font-medium hover:underline"
              >
                support@boostwithlaunchpad.com
              </a>
            </div>

            {/* Support Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9] text-center">
              <div className="w-14 h-14 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-7 h-7 text-[#7C3AED]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                Support Hours
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Mon &ndash; Fri: 9 am &ndash; 6 pm EST
                <br />
                Sat &ndash; Sun: 10 am &ndash; 4 pm EST
              </p>
            </div>

            {/* Quick Response */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9] text-center">
              <div className="w-14 h-14 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-7 h-7 text-[#7C3AED]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                Quick Response
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                We respond to every inquiry within one business day &mdash;
                usually much sooner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calendly Discovery Call ────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[720px] mx-auto px-8">
          <div className="rounded-2xl border-l-4 border-[#7C3AED] bg-[#F8FAFC] p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-3">
              Prefer a live discovery call?
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-6">
              Skip the form and book a free 30-minute strategy session with our
              team. We&rsquo;ll review your current marketing, identify quick
              wins, and map out a growth plan &mdash; no strings attached.
            </p>
            <button
              onClick={() => {
                const win = window as unknown as Record<string, { initPopupWidget: (opts: { url: string }) => void }>;
                if (win.Calendly) {
                  win.Calendly.initPopupWidget({ url: "https://calendly.com/ops-boostwithlaunchpad/30min" });
                }
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#7C3AED] text-white font-semibold rounded-xl text-base hover:bg-[#6D28D9] transition-colors"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact Form ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[720px] mx-auto px-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#F1F5F9]">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">
              Send Us a Message
            </h2>
            <p className="text-[#64748B] mb-8">
              Fill out the form below and we&rsquo;ll be in touch shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1E293B] mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1E293B] mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition-colors"
                />
              </div>

              {/* Service Interest */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-[#1E293B] mb-2"
                >
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition-colors appearance-none"
                >
                  <option value="">Select a service...</option>
                  <option value="Local SEO">Local SEO</option>
                  <option value="AI SEO">AI SEO</option>
                  <option value="LSA">Local Service Ads (LSA)</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Multiple">Multiple Services</option>
                  <option value="Not Sure">Not Sure Yet</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1E293B] mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business and what you're looking for..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition-colors resize-vertical"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#7C3AED] text-white font-semibold rounded-xl text-base hover:bg-[#6D28D9] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#1E293B] text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-center max-w-[560px] mx-auto mb-12 leading-relaxed">
            Quick answers to the questions we hear most.
          </p>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-[#1E293B] font-semibold text-base pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#7C3AED] flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6">
                    <p className="text-[#64748B] leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
