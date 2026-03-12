import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Reviews — Launchpad Boost",
  description:
    "Real results from real businesses. See how Launchpad Boost drives leads, revenue, and growth.",
};

const stats = [
  { value: "10,000+", label: "Leads Generated" },
  { value: "5x", label: "Average ROI" },
  { value: "98%", label: "Client Retention" },
];

const reviews = [
  {
    quote:
      "Launchpad Boost tripled our inbound leads in 60 days. We went from struggling to find new customers to turning work away. Their SEO and Google Ads strategy completely transformed our pipeline.",
    name: "Mark S.",
    company: "Speedy Plumbing",
    service: "SEO + Google Ads",
  },
  {
    quote:
      "New patient bookings are up 200% since we started with Launchpad Boost. Their Local SEO work put us on the map — literally — and the Local Service Ads bring in calls every single day.",
    name: "Dr. Sarah K.",
    company: "Bright Smiles Dental",
    service: "SEO + LSA",
  },
  {
    quote:
      "We got 47 qualified leads in our first month running Meta Ads with Launchpad Boost. The targeting was spot-on and the creative really resonated with our audience. Best marketing investment we've made.",
    name: "James M.",
    company: "Miller & Associates",
    service: "Meta Ads",
  },
  {
    quote:
      "All 5 of our locations now rank on the first page of Google. Launchpad Boost handled everything — citations, reviews, Google Ads — and the results speak for themselves. Revenue is up 40% year over year.",
    name: "Maria G.",
    company: "Casa Maria Restaurants",
    service: "SEO + Google Ads",
  },
  {
    quote:
      "When you ask ChatGPT for a top law firm in our area, it recommends us. That's something no other agency even talked about. Launchpad Boost's AI SEO strategy has opened an entirely new lead channel for us.",
    name: "Tom R.",
    company: "Elite Legal Group",
    service: "AI SEO",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
            Real Results From Real Businesses
          </h1>
          <p className="text-lg text-[#64748B] max-w-[640px] mx-auto leading-relaxed">
            Don&rsquo;t just take our word for it. See what our clients have to
            say about working with Launchpad Boost.
          </p>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-10 text-center shadow-sm border border-[#F1F5F9]"
              >
                <p className="text-4xl font-bold text-[#7C3AED] mb-2">
                  {stat.value}
                </p>
                <p className="text-[#64748B] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#1E293B] text-center mb-14">
            What Our Clients Say
          </h2>

          <div className="flex flex-col gap-10">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-[#F8FAFC] rounded-2xl p-8 md:p-10 border border-[#F1F5F9]"
              >
                {/* Quote icon */}
                <span className="block text-5xl leading-none text-[#7C3AED] font-serif mb-4">
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="text-[#1E293B] text-lg leading-relaxed mb-8">
                  {review.quote}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-[#E2E8F0] flex-shrink-0" />

                  <div>
                    <p className="font-semibold text-[#1E293B]">
                      {review.name}
                    </p>
                    <p className="text-sm text-[#64748B]">{review.company}</p>
                  </div>

                  {/* Service badge */}
                  <span className="ml-auto inline-flex items-center px-4 py-1.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold tracking-wide">
                    {review.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] text-center">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-lg text-[#64748B] max-w-[560px] mx-auto mb-10 leading-relaxed">
            Book a free strategy call and find out how we can deliver the same
            results for your business.
          </p>
          <a
            href="https://boostwithlaunchpad.com/contact"
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
