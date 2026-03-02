"use client";

import { useState } from "react";

const calendlyUrl = "https://calendly.com/ops-boostwithlaunchpad/30min";

const features = [
  {
    icon: "\uD83D\uDCCD",
    title: "Local SEO",
    description:
      "Dominate local search results. We optimize your Google Business Profile, build citations, and get you found by customers in your area.",
  },
  {
    icon: "\uD83E\uDD16",
    title: "AI SEO",
    description:
      "Leverage AI-powered content strategies and technical optimization to outrank competitors and drive organic traffic at scale.",
  },
  {
    icon: "\uD83D\uDEE1\uFE0F",
    title: "Local Service Ads",
    description:
      "Get Google Guaranteed leads with Local Service Ads. Pay only for real leads — phone calls and messages from customers ready to hire.",
  },
  {
    icon: "\uD83C\uDFAF",
    title: "Google Ads",
    description:
      "High-performance PPC campaigns built for ROI. From search to display to shopping — we manage every dollar to maximize your returns.",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "Meta Ads",
    description:
      "Reach your ideal customers on Facebook and Instagram with precision-targeted campaigns that generate leads and drive conversions.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Reporting & Analytics",
    description:
      "Real-time dashboards, monthly reports, and actionable insights so you always know exactly how your marketing is performing.",
  },
];

const stats = [
  { value: "10,000+", label: "Leads Generated" },
  { value: "5x", label: "Average ROI" },
  { value: "24hrs", label: "Onboarding Time" },
];

export default function HomeClient() {
  const [showDemo, setShowDemo] = useState(false);

  const openCalendly = () => {
    const win = window as unknown as Record<string, { initPopupWidget: (opts: { url: string }) => void }>;
    if (win.Calendly) {
      win.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-8 py-24 text-center">
          {/* Badge */}
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#F5F3FF] text-[#7C3AED] text-sm font-semibold tracking-wide">
            Full-Service Digital Marketing
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight mb-6 max-w-3xl mx-auto">
            Grow Your Business With{" "}
            <span className="text-[#7C3AED]">Marketing That Works</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto mb-10 leading-relaxed">
            Local SEO. AI SEO. Google Ads. Meta Ads. Local Service Ads. One
            agency, every channel — built to get you leads, customers, and
            revenue.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={openCalendly} className="btn btn-primary text-lg px-8 py-3.5">
              Get Started Now
            </button>
            <button
              onClick={() => setShowDemo(true)}
              className="btn btn-outline text-lg px-8 py-3.5"
            >
              <span className="mr-2">\u25B6</span> Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#7C3AED] leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[#64748B] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need To{" "}
              <span className="text-[#7C3AED]">Dominate Online</span>
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              From local search to paid ads to AI-powered content, we cover every
              channel so you can focus on running your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-[0.95rem]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ── */}
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Our <span className="text-[#7C3AED]">Clients Say</span>
          </h2>

          <div className="bg-white border border-[#F1F5F9] rounded-xl p-10 shadow-sm">
            <div className="text-[#7C3AED] text-5xl leading-none mb-4">&ldquo;</div>
            <p className="text-lg md:text-xl text-[#1E293B] leading-relaxed mb-8">
              Launchpad Boost completely transformed our online presence. Within 3
              months we saw a 4x increase in leads and our phone hasn&apos;t stopped
              ringing. Best marketing investment we&apos;ve ever made.
            </p>
            <div>
              <p className="font-semibold text-[#0F172A] text-lg">Mark S.</p>
              <p className="text-[#64748B] text-sm">Owner, Speedy Plumbing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Video Modal ── */}
      {showDemo && (
        <div
          className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="relative w-full max-w-[900px] bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close demo video"
            >
              &times;
            </button>

            {/* Video Player */}
            <video
              src="/demo.mp4"
              controls
              autoPlay
              className="w-full aspect-video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
