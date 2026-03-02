"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const STEPS = [
  "Business Info",
  "Services",
  "Key Contacts",
  "Digital Accounts",
  "Google Business Profile",
  "Keywords",
  "AI Presence",
  "Review & Submit",
];

const SERVICE_OPTIONS = [
  "Local SEO",
  "AI SEO",
  "Local Service Ads",
  "Google Ads",
  "Meta Ads",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const KEYWORD_TAGS = [
  "plumber near me",
  "emergency plumbing",
  "HVAC repair",
  "roof replacement",
  "bathroom remodel",
  "kitchen renovation",
  "water heater install",
  "AC maintenance",
  "foundation repair",
  "electrical wiring",
  "pest control",
  "lawn care",
  "house cleaning",
  "moving company",
  "auto repair",
];

const AI_PLATFORMS = [
  "ChatGPT",
  "Gemini",
  "Perplexity",
  "Claude",
  "Copilot",
  "Alexa",
  "Siri",
];

interface HoursEntry {
  open: string;
  close: string;
  closed: boolean;
}

interface FormData {
  // Step 1 - Business Info
  businessName: string;
  industry: string;
  phone: string;
  address: string;
  websiteUrl: string;
  serviceArea: string;
  description: string;
  servicesOffered: string;
  ownsDomain: string;
  domainRegistrar: string;
  domainLogin: string;

  // Step 2 - Services
  selectedServices: string[];

  // Step 3 - Key Contacts
  primaryName: string;
  primaryTitle: string;
  primaryEmail: string;
  primaryPhone: string;
  secondaryName: string;
  secondaryTitle: string;
  secondaryEmail: string;
  secondaryPhone: string;

  // Step 4 - Digital Accounts
  googleAccountEmail: string;
  metaBusinessUrl: string;
  existingAdPlatforms: string;

  // Step 5 - Google Business Profile
  gbpOption: string;
  gbpUrl: string;
  businessHours: Record<string, HoursEntry>;

  // Step 6 - Keywords
  selectedKeywords: string[];
  customKeywords: string;

  // Step 7 - AI Presence
  aiPlatforms: string[];
  competitorUrls: string;
}

const defaultHours: Record<string, HoursEntry> = DAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day]: { open: "09:00", close: "17:00", closed: false },
  }),
  {} as Record<string, HoursEntry>
);

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    phone: "",
    address: "",
    websiteUrl: "",
    serviceArea: "",
    description: "",
    servicesOffered: "",
    ownsDomain: "",
    domainRegistrar: "",
    domainLogin: "",
    selectedServices: [],
    primaryName: "",
    primaryTitle: "",
    primaryEmail: "",
    primaryPhone: "",
    secondaryName: "",
    secondaryTitle: "",
    secondaryEmail: "",
    secondaryPhone: "",
    googleAccountEmail: "",
    metaBusinessUrl: "",
    existingAdPlatforms: "",
    gbpOption: "have",
    gbpUrl: "",
    businessHours: defaultHours,
    selectedKeywords: [],
    customKeywords: "",
    aiPlatforms: [],
    competitorUrls: "",
  });

  const update = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "selectedServices" | "aiPlatforms" | "selectedKeywords", item: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(item)
          ? arr.filter((i) => i !== item)
          : [...arr, item],
      };
    });
  };

  const updateHours = (day: string, key: keyof HoursEntry, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [key]: value },
      },
    }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, 8));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
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

  /* ── Shared input classes ── */
  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] transition placeholder:text-[#94A3B8]";
  const labelCls = "block text-sm font-medium text-[#334155] mb-1.5";

  /* ── Progress bar ── */
  const progressPercent = ((currentStep - 1) / 7) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Header ── */}
      <header className="bg-white border-b border-[#F1F5F9] sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <Image
            src="/launchpad_boost_logo.svg"
            alt="Launchpad Boost"
            width={180}
            height={36}
            className="h-[36px] w-auto"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] text-[#7C3AED] text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Onboarding
          </span>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-10">
        {/* ── Progress ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#7C3AED]">
              Step {currentStep} of 8
            </span>
            <span className="text-xs text-[#94A3B8]">{STEPS[currentStep - 1]}</span>
          </div>
          <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── Step Content Card ── */}
        <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm p-8 md:p-10">
          {/* ──────── STEP 1: Business Info ──────── */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Business Information</h2>
              <p className="text-[#64748B] text-sm mb-8">Tell us about your business so we can tailor our services.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Business Name *</label>
                  <input className={inputCls} placeholder="Acme Plumbing" value={formData.businessName} onChange={(e) => update("businessName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Industry / Category</label>
                  <input className={inputCls} placeholder="Plumbing, HVAC, etc." value={formData.industry} onChange={(e) => update("industry", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input className={inputCls} type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Website URL</label>
                  <input className={inputCls} type="url" placeholder="https://acmeplumbing.com" value={formData.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Business Address</label>
                  <input className={inputCls} placeholder="123 Main St, City, State ZIP" value={formData.address} onChange={(e) => update("address", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Service Area</label>
                  <input className={inputCls} placeholder="e.g. Dallas-Fort Worth, TX" value={formData.serviceArea} onChange={(e) => update("serviceArea", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Business Description</label>
                  <textarea className={inputCls + " min-h-[80px] resize-y"} placeholder="Briefly describe what your business does..." value={formData.description} onChange={(e) => update("description", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Services Offered</label>
                  <textarea className={inputCls + " min-h-[80px] resize-y"} placeholder="List the main services you provide..." value={formData.servicesOffered} onChange={(e) => update("servicesOffered", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Do you own your domain?</label>
                  <select className={inputCls} value={formData.ownsDomain} onChange={(e) => update("ownsDomain", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.ownsDomain === "yes" && (
                  <>
                    <div>
                      <label className={labelCls}>Domain Registrar</label>
                      <input className={inputCls} placeholder="GoDaddy, Namecheap, etc." value={formData.domainRegistrar} onChange={(e) => update("domainRegistrar", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Domain Login Email</label>
                      <input className={inputCls} type="email" placeholder="admin@example.com" value={formData.domainLogin} onChange={(e) => update("domainLogin", e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ──────── STEP 2: Services ──────── */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Select Services</h2>
              <p className="text-[#64748B] text-sm mb-8">Choose the marketing services you are interested in.</p>

              <div className="flex flex-wrap gap-3">
                {SERVICE_OPTIONS.map((service) => {
                  const selected = formData.selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleArrayItem("selectedServices", service)}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 text-sm font-medium transition-all cursor-pointer ${
                        selected
                          ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#7C3AED]/40"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          selected
                            ? "border-white bg-white/20"
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
                    </button>
                  );
                })}
              </div>

              {formData.selectedServices.length > 0 && (
                <p className="mt-6 text-sm text-[#7C3AED] font-medium">
                  {formData.selectedServices.length} service{formData.selectedServices.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          )}

          {/* ──────── STEP 3: Key Contacts ──────── */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Key Contacts</h2>
              <p className="text-[#64748B] text-sm mb-8">Who should we reach out to regarding your account?</p>

              <div className="mb-8">
                <h3 className="text-base font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#7C3AED] text-white text-xs flex items-center justify-center">1</span>
                  Primary Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input className={inputCls} placeholder="John Doe" value={formData.primaryName} onChange={(e) => update("primaryName", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Title / Role</label>
                    <input className={inputCls} placeholder="Owner, Manager, etc." value={formData.primaryTitle} onChange={(e) => update("primaryTitle", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input className={inputCls} type="email" placeholder="john@acme.com" value={formData.primaryEmail} onChange={(e) => update("primaryEmail", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} type="tel" placeholder="(555) 123-4567" value={formData.primaryPhone} onChange={(e) => update("primaryPhone", e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E2E8F0] text-[#64748B] text-xs flex items-center justify-center">2</span>
                  Secondary Contact <span className="text-xs text-[#94A3B8] font-normal">(Optional)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input className={inputCls} placeholder="Jane Doe" value={formData.secondaryName} onChange={(e) => update("secondaryName", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Title / Role</label>
                    <input className={inputCls} placeholder="Office Manager, etc." value={formData.secondaryTitle} onChange={(e) => update("secondaryTitle", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input className={inputCls} type="email" placeholder="jane@acme.com" value={formData.secondaryEmail} onChange={(e) => update("secondaryEmail", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} type="tel" placeholder="(555) 987-6543" value={formData.secondaryPhone} onChange={(e) => update("secondaryPhone", e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────── STEP 4: Digital Accounts ──────── */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Digital Accounts</h2>
              <p className="text-[#64748B] text-sm mb-8">Help us connect your existing digital accounts.</p>

              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Google Account Email</label>
                  <input className={inputCls} type="email" placeholder="you@gmail.com" value={formData.googleAccountEmail} onChange={(e) => update("googleAccountEmail", e.target.value)} />
                  <p className="text-xs text-[#94A3B8] mt-1">The Gmail account associated with Google Ads, Analytics, etc.</p>
                </div>
                <div>
                  <label className={labelCls}>Meta Business Manager URL</label>
                  <input className={inputCls} type="url" placeholder="https://business.facebook.com/..." value={formData.metaBusinessUrl} onChange={(e) => update("metaBusinessUrl", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Existing Ad Platforms</label>
                  <textarea className={inputCls + " min-h-[80px] resize-y"} placeholder="List any platforms you currently advertise on (e.g. Yelp Ads, Thumbtack, HomeAdvisor)..." value={formData.existingAdPlatforms} onChange={(e) => update("existingAdPlatforms", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ──────── STEP 5: Google Business Profile ──────── */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Google Business Profile</h2>
              <p className="text-[#64748B] text-sm mb-8">Your GBP is critical for local search visibility.</p>

              <div className="space-y-6">
                <div>
                  <label className={labelCls}>Do you have a Google Business Profile?</label>
                  <div className="flex gap-3 mt-1">
                    {["have", "create"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("gbpOption", opt)}
                        className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                          formData.gbpOption === opt
                            ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                            : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#7C3AED]/40"
                        }`}
                      >
                        {opt === "have" ? "Yes, I have one" : "No, please create one"}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.gbpOption === "have" && (
                  <div>
                    <label className={labelCls}>GBP Profile URL</label>
                    <input className={inputCls} type="url" placeholder="https://business.google.com/..." value={formData.gbpUrl} onChange={(e) => update("gbpUrl", e.target.value)} />
                  </div>
                )}

                <div>
                  <label className={labelCls}>Business Hours</label>
                  <div className="mt-2 space-y-3">
                    {DAYS.map((day) => {
                      const h = formData.businessHours[day];
                      return (
                        <div key={day} className="flex items-center gap-3 flex-wrap">
                          <span className="w-24 text-sm font-medium text-[#334155] shrink-0">{day}</span>
                          <label className="flex items-center gap-1.5 text-sm text-[#64748B] shrink-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={h.closed}
                              onChange={(e) => updateHours(day, "closed", e.target.checked)}
                              className="w-4 h-4 rounded border-[#CBD5E1] text-[#7C3AED] focus:ring-[#7C3AED]"
                            />
                            Closed
                          </label>
                          {!h.closed && (
                            <>
                              <input
                                type="time"
                                value={h.open}
                                onChange={(e) => updateHours(day, "open", e.target.value)}
                                className="px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                              />
                              <span className="text-[#94A3B8] text-sm">to</span>
                              <input
                                type="time"
                                value={h.close}
                                onChange={(e) => updateHours(day, "close", e.target.value)}
                                className="px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────── STEP 6: Keywords ──────── */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Target Keywords</h2>
              <p className="text-[#64748B] text-sm mb-8">Select keywords relevant to your business or add your own.</p>

              <div className="mb-6">
                <label className={labelCls}>Select from common keywords</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {KEYWORD_TAGS.map((kw) => {
                    const selected = formData.selectedKeywords.includes(kw);
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => toggleArrayItem("selectedKeywords", kw)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selected
                            ? "bg-[#7C3AED] text-white shadow-sm"
                            : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                        }`}
                      >
                        {selected ? "- " : "+ "}
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelCls}>Custom Keywords</label>
                <textarea
                  className={inputCls + " min-h-[100px] resize-y"}
                  placeholder="Add any additional keywords, one per line..."
                  value={formData.customKeywords}
                  onChange={(e) => update("customKeywords", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ──────── STEP 7: AI Presence ──────── */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">AI Presence</h2>
              <p className="text-[#64748B] text-sm mb-8">Help us understand your visibility in AI search platforms.</p>

              <div className="mb-6">
                <label className={labelCls}>Which AI platforms do you want to be found on?</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {AI_PLATFORMS.map((platform) => {
                    const selected = formData.aiPlatforms.includes(platform);
                    return (
                      <label
                        key={platform}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all ${
                          selected
                            ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                            : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#7C3AED]/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleArrayItem("aiPlatforms", platform)}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center text-[10px] ${
                            selected ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-[#CBD5E1]"
                          }`}
                        >
                          {selected && (
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {platform}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelCls}>Competitor URLs</label>
                <textarea
                  className={inputCls + " min-h-[100px] resize-y"}
                  placeholder="Enter competitor website URLs, one per line..."
                  value={formData.competitorUrls}
                  onChange={(e) => update("competitorUrls", e.target.value)}
                />
                <p className="text-xs text-[#94A3B8] mt-1">We will analyze competitor AI presence to build your strategy.</p>
              </div>
            </div>
          )}

          {/* ──────── STEP 8: Review & Submit ──────── */}
          {currentStep === 8 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Review & Submit</h2>
              <p className="text-[#64748B] text-sm mb-8">Please review your information before submitting.</p>

              <div className="space-y-6">
                {/* Business Info */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <h3 className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">Business Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div><span className="text-[#94A3B8]">Name:</span> <span className="text-[#1E293B] font-medium">{formData.businessName || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Industry:</span> <span className="text-[#1E293B] font-medium">{formData.industry || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Phone:</span> <span className="text-[#1E293B] font-medium">{formData.phone || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Website:</span> <span className="text-[#1E293B] font-medium">{formData.websiteUrl || "---"}</span></div>
                    <div className="md:col-span-2"><span className="text-[#94A3B8]">Address:</span> <span className="text-[#1E293B] font-medium">{formData.address || "---"}</span></div>
                    <div className="md:col-span-2"><span className="text-[#94A3B8]">Service Area:</span> <span className="text-[#1E293B] font-medium">{formData.serviceArea || "---"}</span></div>
                  </div>
                </div>

                {/* Services */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <h3 className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">Selected Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedServices.length > 0 ? (
                      formData.selectedServices.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-medium">{s}</span>
                      ))
                    ) : (
                      <span className="text-sm text-[#94A3B8]">No services selected</span>
                    )}
                  </div>
                </div>

                {/* Contacts */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <h3 className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">Primary Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div><span className="text-[#94A3B8]">Name:</span> <span className="text-[#1E293B] font-medium">{formData.primaryName || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Email:</span> <span className="text-[#1E293B] font-medium">{formData.primaryEmail || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Phone:</span> <span className="text-[#1E293B] font-medium">{formData.primaryPhone || "---"}</span></div>
                    <div><span className="text-[#94A3B8]">Title:</span> <span className="text-[#1E293B] font-medium">{formData.primaryTitle || "---"}</span></div>
                  </div>
                </div>

                {/* Keywords & AI */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <h3 className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">Keywords & AI</h3>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="text-[#94A3B8]">Keywords:</span>{" "}
                      <span className="text-[#1E293B] font-medium">
                        {formData.selectedKeywords.length > 0 ? formData.selectedKeywords.join(", ") : "---"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">AI Platforms:</span>{" "}
                      <span className="text-[#1E293B] font-medium">
                        {formData.aiPlatforms.length > 0 ? formData.aiPlatforms.join(", ") : "---"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#F1F5F9]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 8 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition shadow-sm cursor-pointer"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-sm font-semibold hover:from-[#6D28D9] hover:to-[#5B21B6] transition shadow-lg shadow-[#7C3AED]/25 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Onboarding
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
