"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  goals: string;
  budget: string;
  timeline: string;
  notes: string;
}

export default function OnboardingBoostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    goals: "",
    budget: "",
    timeline: "",
    notes: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePassword = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "LP-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const password = generatePassword();

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, generatedPassword: password }),
      });

      if (res.ok) {
        localStorage.setItem("clientPassword", password);
        router.push("/success");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Shared classes ── */
  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-[#d4d1c7] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#2a4f0e]/30 focus:border-[#2a4f0e] transition placeholder:text-[#999]";
  const labelCls = "block text-sm font-medium text-[#3d3d3d] mb-1.5";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9f9f7" }}>
      {/* ── Header ── */}
      <header className="border-b border-[#e5e2d9] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[700px] mx-auto px-6 py-5 text-center">
          <h1
            className="text-2xl font-bold tracking-[0.15em] text-[#2a4f0e]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            LAUNCHPAD
          </h1>
          <p className="text-xs text-[#7a7a6e] tracking-widest uppercase mt-0.5">
            Client Onboarding
          </p>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-6 py-10">
        <form onSubmit={handleSubmit}>
          {/* ──────── Section 1: Business Information ──────── */}
          <div className="bg-white rounded-xl border border-[#e5e2d9] shadow-sm p-7 md:p-9 mb-6">
            <h2
              className="text-xl font-bold text-[#1a1a1a] mb-1"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Business Information
            </h2>
            <p className="text-sm text-[#7a7a6e] mb-7">Basic details about your company.</p>

            <div className="space-y-5">
              <div>
                <label className={labelCls}>Business Name *</label>
                <input
                  className={inputCls}
                  placeholder="Your Business Name"
                  required
                  value={formData.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Owner Name *</label>
                  <input
                    className={inputCls}
                    placeholder="John Doe"
                    required
                    value={formData.ownerName}
                    onChange={(e) => update("ownerName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="john@business.com"
                    required
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input
                    className={inputCls}
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <input
                    className={inputCls}
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={formData.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Category / Industry</label>
                <input
                  className={inputCls}
                  placeholder="e.g. Home Services, Restaurant, Legal, etc."
                  value={formData.category}
                  onChange={(e) => update("category", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ──────── Section 2: Location ──────── */}
          <div className="bg-white rounded-xl border border-[#e5e2d9] shadow-sm p-7 md:p-9 mb-6">
            <h2
              className="text-xl font-bold text-[#1a1a1a] mb-1"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Location
            </h2>
            <p className="text-sm text-[#7a7a6e] mb-7">Where is your business located?</p>

            <div className="space-y-5">
              <div>
                <label className={labelCls}>Street Address</label>
                <input
                  className={inputCls}
                  placeholder="123 Main Street"
                  value={formData.streetAddress}
                  onChange={(e) => update("streetAddress", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>City</label>
                  <input
                    className={inputCls}
                    placeholder="Dallas"
                    value={formData.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <input
                    className={inputCls}
                    placeholder="TX"
                    value={formData.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>ZIP Code</label>
                  <input
                    className={inputCls}
                    placeholder="75201"
                    value={formData.zip}
                    onChange={(e) => update("zip", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ──────── Section 3: Project Details ──────── */}
          <div className="bg-white rounded-xl border border-[#e5e2d9] shadow-sm p-7 md:p-9 mb-8">
            <h2
              className="text-xl font-bold text-[#1a1a1a] mb-1"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Project Details
            </h2>
            <p className="text-sm text-[#7a7a6e] mb-7">Tell us about your goals and budget.</p>

            <div className="space-y-5">
              <div>
                <label className={labelCls}>Goals</label>
                <textarea
                  className={inputCls + " min-h-[100px] resize-y"}
                  placeholder="What are you hoping to achieve? More leads, brand awareness, higher rankings..."
                  value={formData.goals}
                  onChange={(e) => update("goals", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Budget Range</label>
                  <select
                    className={inputCls}
                    value={formData.budget}
                    onChange={(e) => update("budget", e.target.value)}
                  >
                    <option value="">Select budget...</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-20k">$10,000 - $20,000</option>
                    <option value="20k+">$20,000+</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Timeline</label>
                  <select
                    className={inputCls}
                    value={formData.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                  >
                    <option value="">Select timeline...</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1-2 Weeks</option>
                    <option value="1-month">1 Month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Additional Notes</label>
                <textarea
                  className={inputCls + " min-h-[80px] resize-y"}
                  placeholder="Anything else we should know..."
                  value={formData.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl text-white text-sm font-semibold transition shadow-sm disabled:opacity-60 cursor-pointer"
            style={{ backgroundColor: "#2a4f0e" }}
            onMouseEnter={(e) => {
              if (!submitting) (e.currentTarget.style.backgroundColor = "#1e3a0a");
            }}
            onMouseLeave={(e) => {
              if (!submitting) (e.currentTarget.style.backgroundColor = "#2a4f0e");
            }}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Onboarding"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
