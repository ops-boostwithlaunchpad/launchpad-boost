"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const SERVICE_OPTIONS = [
  "Local SEO",
  "AI SEO",
  "Local Service Ads",
  "Google Ads",
  "Meta Ads",
  "Website Design",
  "AI Agents",
  "CRM Development",
  "Workflow Automation",
  "Chatbot/Voice AI",
];

interface FormData {
  businessName: string;
  clientEmail: string;
  contactName: string;
  phone: string;
  address: string;
  city: string;
  stateZip: string;
  services: string[];
  monthlyPrice: string;
  setupFee: string;
  aiMeetingSummary: string;
  proposalText: string;
}

function ApproveForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    clientEmail: "",
    contactName: "",
    phone: "",
    address: "",
    city: "",
    stateZip: "",
    services: [],
    monthlyPrice: "",
    setupFee: "",
    aiMeetingSummary: "",
    proposalText: "",
  });

  /* ── Pre-fill from URL params ── */
  useEffect(() => {
    const prefill: Partial<FormData> = {};
    const paramMap: Record<string, keyof FormData> = {
      businessName: "businessName",
      business: "businessName",
      email: "clientEmail",
      clientEmail: "clientEmail",
      contact: "contactName",
      contactName: "contactName",
      phone: "phone",
      address: "address",
      city: "city",
      stateZip: "stateZip",
      monthlyPrice: "monthlyPrice",
      setupFee: "setupFee",
      summary: "aiMeetingSummary",
      proposal: "proposalText",
    };

    for (const [param, field] of Object.entries(paramMap)) {
      const val = searchParams.get(param);
      if (val) (prefill as Record<string, unknown>)[field] = val;
    }

    const servicesParam = searchParams.get("services");
    if (servicesParam) {
      prefill.services = servicesParam.split(",").map((s) => s.trim());
    }

    if (Object.keys(prefill).length > 0) {
      setFormData((prev) => ({ ...prev, ...prefill }));
    }
  }, [searchParams]);

  const update = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Placeholder: in production, POST to your webhook URL
      alert(
        "Approval submitted successfully!\n\nIn production, this would POST to your webhook and trigger Stripe payment link creation."
      );
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Shared classes ── */
  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition placeholder:text-[#94A3B8]";
  const labelCls = "block text-sm font-medium text-[#334155] mb-1.5";

  /* ── Success View ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="max-w-[500px] w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Proposal Approved</h1>
          <p className="text-[#64748B] mb-2">
            The Stripe payment link has been created and emailed to{" "}
            <span className="font-medium text-[#1E293B]">{formData.clientEmail || "the client"}</span>.
          </p>
          <p className="text-sm text-[#94A3B8] mb-8">
            They will receive an email with the proposal details and a secure payment link.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                businessName: "",
                clientEmail: "",
                contactName: "",
                phone: "",
                address: "",
                city: "",
                stateZip: "",
                services: [],
                monthlyPrice: "",
                setupFee: "",
                aiMeetingSummary: "",
                proposalText: "",
              });
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#475569] hover:bg-white transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Approve Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Header ── */}
      <header className="bg-white border-b border-[#F1F5F9] sticky top-0 z-50">
        <div className="max-w-[700px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <Image
            src="/launchpad_boost_logo.svg"
            alt="Launchpad Boost"
            width={180}
            height={36}
            className="h-[36px] w-auto"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Internal Only
          </span>
        </div>
      </header>

      <main className="max-w-[650px] mx-auto px-6 py-10">
        <form onSubmit={handleSubmit}>
          {/* ── Info Box ── */}
          <div className="mb-8 p-5 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#5B21B6] mb-1">What happens on approval?</p>
                <p className="text-sm text-[#6D28D9]/80 leading-relaxed">
                  A Stripe payment link will be automatically created based on the pricing below and emailed to the client along with the proposal details. The client can then review and pay securely online.
                </p>
              </div>
            </div>
          </div>

          {/* ── Form Card ── */}
          <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm p-8 md:p-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-6">Proposal Approval</h2>

            {/* Client Details */}
            <div className="space-y-5 mb-8">
              <div>
                <label className={labelCls}>Client Business Name *</label>
                <input
                  className={inputCls}
                  placeholder="Acme Plumbing"
                  required
                  value={formData.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Client Email *</label>
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="client@business.com"
                    required
                    value={formData.clientEmail}
                    onChange={(e) => update("clientEmail", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Contact Name</label>
                  <input
                    className={inputCls}
                    placeholder="John Doe"
                    value={formData.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
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
                  <label className={labelCls}>Address</label>
                  <input
                    className={inputCls}
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <label className={labelCls}>State / ZIP</label>
                  <input
                    className={inputCls}
                    placeholder="TX 75201"
                    value={formData.stateZip}
                    onChange={(e) => update("stateZip", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-8">
              <label className={labelCls}>Services</label>
              <div className="grid grid-cols-2 gap-2.5 mt-2">
                {SERVICE_OPTIONS.map((service) => {
                  const selected = formData.services.includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm cursor-pointer transition-all ${
                        selected
                          ? "border-[#7C3AED] bg-[#F5F3FF] text-[#5B21B6] font-medium"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#7C3AED]/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleService(service)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded border-2 flex items-center justify-center transition-all ${
                          selected
                            ? "border-[#7C3AED] bg-[#7C3AED]"
                            : "border-[#CBD5E1] bg-transparent"
                        }`}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      {service}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div>
                <label className={labelCls}>Monthly Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">$</span>
                  <input
                    className={inputCls + " pl-8"}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="1,500"
                    required
                    value={formData.monthlyPrice}
                    onChange={(e) => update("monthlyPrice", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Setup Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">$</span>
                  <input
                    className={inputCls + " pl-8"}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="500"
                    value={formData.setupFee}
                    onChange={(e) => update("setupFee", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* AI Meeting Summary */}
            <div className="mb-5">
              <label className={labelCls}>AI Meeting Summary</label>
              <textarea
                className={inputCls + " min-h-[100px] resize-y"}
                placeholder="Paste the AI-generated meeting summary here..."
                value={formData.aiMeetingSummary}
                onChange={(e) => update("aiMeetingSummary", e.target.value)}
              />
            </div>

            {/* Proposal Text */}
            <div className="mb-8">
              <label className={labelCls}>Proposal Text</label>
              <textarea
                className={inputCls + " min-h-[120px] resize-y"}
                placeholder="Enter the full proposal text that will be sent to the client..."
                value={formData.proposalText}
                onChange={(e) => update("proposalText", e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl text-white text-sm font-semibold transition shadow-lg shadow-[#7C3AED]/20 disabled:opacity-60 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)",
              }}
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2 justify-center">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 justify-center">
                  Approve & Send to Client
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function ApprovePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-center">
            <svg className="w-8 h-8 animate-spin text-[#7C3AED] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-[#64748B]">Loading...</p>
          </div>
        </div>
      }
    >
      <ApproveForm />
    </Suspense>
  );
}
