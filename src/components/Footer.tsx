import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Brand & Mission */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Nainix Updates</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              The official, premium, and trusted portal for Indian students and job seekers. Find the latest education updates, admit cards, government jobs, and exam results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/latest-jobs" className="transition-colors hover:text-white">
                  Latest Government Jobs
                </Link>
              </li>
              <li>
                <Link href="/admit-cards" className="transition-colors hover:text-white">
                  Download Admit Cards
                </Link>
              </li>
              <li>
                <Link href="/results" className="transition-colors hover:text-white">
                  Exam Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal & Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Nainix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
