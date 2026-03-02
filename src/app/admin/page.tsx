"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import Image from "next/image";

/* ──────────────────────────── Types ──────────────────────────── */

interface Client {
  _id: string;
  businessName: string;
  category: string;
  email: string;
  city: string;
  password: string;
  status: string;
  keywords?: string[];
}

interface Submission {
  _id: string;
  businessName: string;
  date: string;
  gbpOptimization?: boolean;
  keywords?: string[];
  keywordSearchReport?: boolean;
  category?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  website?: string;
  notes?: string;
}

interface EmailSignup {
  _id: string;
  email: string;
  date: string;
}

type View = "profiles" | "submissions" | "newsletter" | "analytics";

/* ────────────────────────── Sidebar Nav Items ────────────────── */

const navItems: { label: string; view: View; icon: ReactNode }[] = [
  {
    label: "Profiles",
    view: "profiles",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Submissions",
    view: "submissions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Newsletter",
    view: "newsletter",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    view: "analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

/* ════════════════════════════════════════════════════════════════
   ADMIN DASHBOARD PAGE
   ════════════════════════════════════════════════════════════════ */

export default function AdminDashboard() {
  /* ── Auth state ── */
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  /* ── View state ── */
  const [activeView, setActiveView] = useState<View>("profiles");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ── Profiles state ── */
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientsLoading, setClientsLoading] = useState(false);

  /* ── Add Client modal state ── */
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ businessName: "", category: "", email: "", city: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState<{ password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  /* ── Submissions state ── */
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [emailSignups, setEmailSignups] = useState<EmailSignup[]>([]);

  /* ── Newsletter state ── */
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterBody, setNewsletterBody] = useState("");
  const [newsletterSending, setNewsletterSending] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  /* ──────────────────────── Check session on mount ──────────── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("admin_auth");
      if (token === "true") {
        setAuthenticated(true);
      }
    }
  }, []);

  /* ──────────────────────── Fetch clients ───────────────────── */
  const fetchClients = useCallback(async () => {
    setClientsLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || data || []);
      }
    } catch {
      /* silent */
    } finally {
      setClientsLoading(false);
    }
  }, []);

  /* ──────────────────────── Fetch submissions ───────────────── */
  const fetchSubmissions = useCallback(async () => {
    setSubmissionsLoading(true);
    try {
      const [subsRes, emailsRes] = await Promise.all([
        fetch("/api/admin/submissions"),
        fetch("/api/admin/emails"),
      ]);
      if (subsRes.ok) {
        const data = await subsRes.json();
        setSubmissions(data.submissions || data || []);
      }
      if (emailsRes.ok) {
        const data = await emailsRes.json();
        setEmailSignups(data.emails || data || []);
      }
    } catch {
      /* silent */
    } finally {
      setSubmissionsLoading(false);
    }
  }, []);

  /* ──────────────────────── Load data on auth / view change ─── */
  useEffect(() => {
    if (!authenticated) return;
    if (activeView === "profiles") fetchClients();
    if (activeView === "submissions") fetchSubmissions();
  }, [authenticated, activeView, fetchClients, fetchSubmissions]);

  /* ──────────────────────── Handlers ────────────────────────── */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_auth", "true");
        setAuthenticated(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      if (res.ok) {
        const data = await res.json();
        setAddSuccess({ password: data.password || data.client?.password || "N/A" });
        setNewClient({ businessName: "", category: "", email: "", city: "" });
        fetchClients();
      }
    } catch {
      /* silent */
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchClients();
    } catch {
      /* silent */
    }
  };

  const handleCopyPassword = (pw: string) => {
    navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
    setPassword("");
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSending(true);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: newsletterSubject, body: newsletterBody }),
      });
      if (res.ok) {
        setNewsletterSent(true);
        setNewsletterSubject("");
        setNewsletterBody("");
        setTimeout(() => setNewsletterSent(false), 3000);
      }
    } catch {
      /* silent */
    } finally {
      setNewsletterSending(false);
    }
  };

  /* ──────────────────────── Derived data ────────────────────── */

  const filteredClients = clients.filter(
    (c) =>
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = clients.filter((c) => c.status === "Active" || !c.status).length;
  const keywordsCount = clients.reduce((acc, c) => acc + (c.keywords?.length || 0), 0);

  /* ════════════════════════════════════════════════════════════
     LOGIN OVERLAY
     ════════════════════════════════════════════════════════════ */

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0F172A] flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/launchpad_boost_logo.svg"
              alt="Launchpad Boost"
              width={200}
              height={40}
              className="h-[40px] w-auto brightness-0 invert"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-center text-2xl font-bold text-white mb-8">Admin Access</h1>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-[#1E293B] border border-[#334155] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                required
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     DASHBOARD LAYOUT
     ════════════════════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* ─── Mobile Header ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F172A] h-16 flex items-center justify-between px-4">
        <Image
          src="/launchpad_boost_logo.svg"
          alt="Launchpad Boost"
          width={160}
          height={32}
          className="h-[32px] w-auto brightness-0 invert"
        />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2"
          aria-label="Toggle sidebar"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ─── Sidebar ─── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-[#0F172A] z-40 flex flex-col transition-transform duration-300
          lg:translate-x-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Logo */}
        <div className="hidden lg:flex items-center h-20 px-6 border-b border-[#1E293B]">
          <Image
            src="/launchpad_boost_logo.svg"
            alt="Launchpad Boost"
            width={180}
            height={36}
            className="h-[36px] w-auto brightness-0 invert"
          />
        </div>

        {/* Mobile spacer for mobile header */}
        <div className="h-16 lg:hidden" />

        {/* Nav Items */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                setActiveView(item.view);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  activeView === item.view
                    ? "bg-[#7C3AED] text-white"
                    : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-white"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#1E293B]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#94A3B8] hover:bg-[#1E293B] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Mobile overlay ─── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ─── Main Content ─── */}
      <main className="lg:ml-[260px] min-h-screen pt-16 lg:pt-0">
        {/* ══════════ PROFILES VIEW ══════════ */}
        {activeView === "profiles" && (
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-2xl font-bold text-[#0F172A]">Overview</h1>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent w-full sm:w-[260px]"
                  />
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(true);
                    setAddSuccess(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                <p className="text-sm font-medium text-[#64748B] mb-1">Active Clients</p>
                <p className="text-3xl font-bold text-[#0F172A]">{activeCount}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Keywords</p>
                <p className="text-3xl font-bold text-[#0F172A]">{keywordsCount}</p>
              </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Business</th>
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Category</th>
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Location</th>
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Password</th>
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsLoading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[#94A3B8]">Loading clients...</td>
                      </tr>
                    ) : filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[#94A3B8]">
                          {searchQuery ? "No clients match your search." : "No clients yet. Click Add to create one."}
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map((client) => (
                        <tr key={client._id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-[#0F172A]">{client.businessName}</p>
                            <p className="text-xs text-[#94A3B8]">{client.email}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#475569]">{client.category}</td>
                          <td className="px-6 py-4 text-sm text-[#475569]">{client.city}</td>
                          <td className="px-6 py-4">
                            <code className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-1 rounded font-mono">{client.password}</code>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteClient(client._id)}
                              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ SUBMISSIONS VIEW ══════════ */}
        {activeView === "submissions" && (
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-8">Client Submissions</h1>

            {submissionsLoading ? (
              <p className="text-[#94A3B8]">Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
                <p className="text-[#94A3B8]">No submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((sub) => (
                  <div key={sub._id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
                    {/* Submission Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A]">{sub.businessName}</h3>
                        <p className="text-sm text-[#94A3B8]">
                          Submitted {new Date(sub.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {sub.gbpOptimization && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
                            GBP Optimization
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Keywords */}
                    {sub.keywords && sub.keywords.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {sub.keywords.map((kw, i) => (
                            <span key={i} className="inline-block px-3 py-1 bg-[#F1F5F9] text-[#475569] text-xs rounded-full font-medium">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Keyword Search Report */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${sub.keywordSearchReport ? "bg-[#7C3AED] border-[#7C3AED]" : "border-[#CBD5E1]"}`}>
                        {sub.keywordSearchReport && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-[#475569]">Keyword Search Report</span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#F1F5F9]">
                      {sub.category && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Category</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.category}</p>
                        </div>
                      )}
                      {sub.phone && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Phone</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.phone}</p>
                        </div>
                      )}
                      {sub.email && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Email</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.email}</p>
                        </div>
                      )}
                      {sub.city && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">City</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.city}</p>
                        </div>
                      )}
                      {sub.address && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Address</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.address}</p>
                        </div>
                      )}
                      {sub.website && (
                        <div>
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Website</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.website}</p>
                        </div>
                      )}
                      {sub.notes && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Notes</p>
                          <p className="text-sm text-[#0F172A] mt-0.5">{sub.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Weekly Report Email Signups */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Weekly Report Email Signups</h2>
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                {emailSignups.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-[#94A3B8]">No email signups yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                          <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Email</th>
                          <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-6 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailSignups.map((signup) => (
                          <tr key={signup._id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-6 py-4 text-sm text-[#0F172A] font-medium">{signup.email}</td>
                            <td className="px-6 py-4 text-sm text-[#94A3B8]">
                              {new Date(signup.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ NEWSLETTER VIEW ══════════ */}
        {activeView === "newsletter" && (
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-8">Newsletter</h1>

            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 max-w-2xl">
              <form onSubmit={handleSendNewsletter} className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={newsletterSubject}
                    onChange={(e) => setNewsletterSubject(e.target.value)}
                    placeholder="Enter email subject..."
                    className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                    required
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Body</label>
                  <textarea
                    value={newsletterBody}
                    onChange={(e) => setNewsletterBody(e.target.value)}
                    placeholder="Write your newsletter content here...&#10;&#10;Available template variables:&#10;{{businessName}} - Client business name&#10;{{firstName}} - Client first name&#10;{{date}} - Current date"
                    rows={12}
                    className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-y font-mono"
                    required
                  />
                  <p className="mt-2 text-xs text-[#94A3B8]">
                    Template variables: <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded">{"{{businessName}}"}</code>{" "}
                    <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded">{"{{firstName}}"}</code>{" "}
                    <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded">{"{{date}}"}</code>
                  </p>
                </div>

                {/* Send */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={newsletterSending}
                    className="px-8 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {newsletterSending ? "Sending..." : "Send Now"}
                  </button>
                  {newsletterSent && (
                    <span className="text-sm text-emerald-600 font-medium">Newsletter sent successfully!</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════ ANALYTICS VIEW ══════════ */}
        {activeView === "analytics" && (
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-8">Analytics</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Retention */}
              <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[#64748B]">Retention</span>
                  <span className="w-10 h-10 bg-[#F5F3FF] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#0F172A] mb-1">98%</p>
                <p className="text-sm text-emerald-600 font-medium">+2.5% from last month</p>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[#64748B]">Revenue</span>
                  <span className="w-10 h-10 bg-[#F5F3FF] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#0F172A] mb-1">$15k</p>
                <p className="text-sm text-emerald-600 font-medium">+8.1% from last month</p>
              </div>

              {/* Conversion */}
              <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[#64748B]">Conversion</span>
                  <span className="w-10 h-10 bg-[#F5F3FF] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#0F172A] mb-1">12.5%</p>
                <p className="text-sm text-emerald-600 font-medium">+1.2% from last month</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ════════════════════════════════════════════════════════
         ADD CLIENT MODAL
         ════════════════════════════════════════════════════════ */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
          onClick={() => {
            setShowAddModal(false);
            setAddSuccess(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#0F172A]">
                {addSuccess ? "Client Created" : "Add New Client"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddSuccess(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#475569] transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              {addSuccess ? (
                /* ── Success View ── */
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#0F172A] font-semibold mb-2">Client added successfully!</p>
                  <p className="text-sm text-[#64748B] mb-6">Here is the generated password:</p>

                  <div className="flex items-center gap-2 bg-[#F1F5F9] rounded-lg p-3 mb-6">
                    <code className="flex-1 text-center text-lg font-mono font-semibold text-[#0F172A]">
                      {addSuccess.password}
                    </code>
                    <button
                      onClick={() => handleCopyPassword(addSuccess.password)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      {copied ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setAddSuccess(null);
                    }}
                    className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-lg transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* ── Add Client Form ── */
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Business Name</label>
                    <input
                      type="text"
                      value={newClient.businessName}
                      onChange={(e) => setNewClient({ ...newClient, businessName: e.target.value })}
                      placeholder="e.g. Speedy Plumbing"
                      className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Category</label>
                    <input
                      type="text"
                      value={newClient.category}
                      onChange={(e) => setNewClient({ ...newClient, category: e.target.value })}
                      placeholder="e.g. Plumbing"
                      className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">City</label>
                    <input
                      type="text"
                      value={newClient.city}
                      onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                      placeholder="e.g. Dallas, TX"
                      className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {addLoading ? "Creating..." : "Create Client"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
