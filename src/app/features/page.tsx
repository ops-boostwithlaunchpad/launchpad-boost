import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Services — Launchpad Boost",
  description:
    "Every channel covered. Local SEO, AI SEO, Google Ads, Meta Ads, and Local Service Ads — managed for maximum growth.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
            Our Services &mdash; Every Channel Covered
          </h1>
          <p className="text-lg text-[#64748B] max-w-[680px] mx-auto leading-relaxed">
            We manage your entire digital presence so you can focus on running
            your business. From local search to paid ads to AI-driven growth,
            Launchpad Boost has you covered.
          </p>
        </div>
      </section>

      {/* ── Local SEO ──────────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-sm font-semibold text-[#7C3AED] tracking-wider uppercase mb-3">
            Local SEO
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Dominate Your Local Market
          </h2>
          <p className="text-[#64748B] max-w-[640px] mb-12 leading-relaxed">
            Get found by customers in your area. We optimize every local signal
            so your business shows up first.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                GBP
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Google Business Profile
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Full optimization of your Google Business Profile — categories,
                attributes, posts, photos, and Q&amp;A — so you rank higher in
                Maps and local search.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                REV
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Review Generation
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Automated review request campaigns via SMS and email that turn
                happy customers into five-star reviews — boosting trust and local
                rankings.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                CIT
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Citation Building
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                We build and clean up citations across 60+ directories — Yelp,
                Apple Maps, Bing, and more — ensuring consistent NAP data
                everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI SEO ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-sm font-semibold text-[#7C3AED] tracking-wider uppercase mb-3">
            AI SEO
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Get Recommended by AI
          </h2>
          <p className="text-[#64748B] max-w-[640px] mb-12 leading-relaxed">
            ChatGPT, Gemini, and Perplexity are the new search engines. We make
            sure they recommend your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                AI
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                AI Search Optimization
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                We structure your content, schema, and authority signals so
                large-language-model search engines cite and recommend your
                business in conversational results.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                AUT
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Authority Content
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                High-quality blog posts, FAQs, and resource pages that build
                topical authority — making your site the go-to source for AI
                models and traditional search alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Local Service Ads ──────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-sm font-semibold text-[#7C3AED] tracking-wider uppercase mb-3">
            Local Service Ads
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Google Guaranteed Leads
          </h2>
          <p className="text-[#64748B] max-w-[640px] mb-12 leading-relaxed">
            Appear at the very top of Google with the Google Guaranteed badge and
            only pay when a real customer contacts you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                GG
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Google Guaranteed Badge
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                We handle the full verification process — background checks,
                insurance, and license validation — so you earn Google&rsquo;s
                trust badge and stand out from competitors.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                PPL
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Pay Per Lead
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                No wasted ad spend. You only pay when a potential customer calls
                or messages you directly through the ad — real leads, not clicks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                OPT
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Campaign Optimization
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Ongoing bid management, budget allocation, and dispute handling
                to keep your cost-per-lead low and your appointment calendar
                full.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Ads ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-sm font-semibold text-[#7C3AED] tracking-wider uppercase mb-3">
            Google Ads
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Targeted Search &amp; Display Campaigns
          </h2>
          <p className="text-[#64748B] max-w-[640px] mb-12 leading-relaxed">
            Reach customers the moment they search for what you offer. Our
            data-driven campaigns maximize every dollar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                SRC
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Search Campaigns
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Keyword research, ad copy, and bid strategy built around
                high-intent searches — so every click is a potential customer.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                DIS
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Display &amp; Retargeting
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Visual banner ads across Google&rsquo;s Display Network plus
                retargeting campaigns that bring back visitors who didn&rsquo;t
                convert the first time.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                TRK
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Conversion Tracking
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Full-funnel tracking from click to call to sale — so you know
                exactly which ads drive revenue and we can continuously optimize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meta Ads ───────────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-sm font-semibold text-[#7C3AED] tracking-wider uppercase mb-3">
            Meta Ads
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Facebook &amp; Instagram Advertising
          </h2>
          <p className="text-[#64748B] max-w-[640px] mb-12 leading-relaxed">
            Put your business in front of the right audience on the
            world&rsquo;s largest social platforms with scroll-stopping creative
            and precision targeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                AUD
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Audience Targeting
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Custom and lookalike audiences built from your customer data,
                website visitors, and demographic research — reaching people most
                likely to buy.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                CRE
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Ad Creative
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Thumb-stopping images, videos, carousels, and copy written to
                convert — tested and iterated through structured A/B
                experiments.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F5F9]">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-lg mb-5">
                RTG
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                Retargeting Funnels
              </h3>
              <p className="text-[#64748B] leading-relaxed text-sm">
                Multi-step retargeting sequences that nurture warm leads from
                awareness to action — recapturing lost visitors and turning them
                into paying customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            Ready To Grow?
          </h2>
          <p className="text-lg text-[#64748B] max-w-[560px] mx-auto mb-10 leading-relaxed">
            Book a free strategy call and see exactly how we&rsquo;ll increase
            your leads, revenue, and online visibility.
          </p>
          <a
            href="https://boostwithlaunchpad.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#7C3AED] text-white font-semibold rounded-xl text-base hover:bg-[#6D28D9] transition-colors cursor-pointer"
          >
            Book Your Free Strategy Call
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
