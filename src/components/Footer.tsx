import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0C10] text-[#E2E8F0] pt-16 pb-8 mt-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Launchpad Boost</h4>
            <p className="text-[#94A3B8] leading-relaxed text-sm">
              Full-service digital marketing — SEO, ads, and AI-powered growth — built for
              businesses that need results.
            </p>
          </div>
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Services</h4>
            <Link href="/features" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              All Services
            </Link>
            <Link href="/reviews" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              Reviews
            </Link>
            <Link href="/contact" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              Contact
            </Link>
          </div>
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Legal</h4>
            <Link href="#" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              Privacy Policy
            </Link>
            <Link href="#" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              Terms of Service
            </Link>
          </div>
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Contact</h4>
            <Link href="/contact" className="block text-[#94A3B8] text-sm mb-3 hover:text-[#7C3AED]">
              Get In Touch
            </Link>
            <p className="text-[#94A3B8] mt-3">A Launchpad Company</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-[#64748B] text-sm">
          &copy; 2026 Launchpad Boost. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
