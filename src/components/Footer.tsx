import Link from 'next/link';
import { Send, Globe, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { NainixLogo } from '@/components/NainixLogo';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-12 border-t border-slate-800">
      <div className="container mx-auto px-4 py-16 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter (Takes up 4 columns on large screens) */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-blue-600 text-white font-bold">
                <NainixLogo className="h-6 w-6 fill-current" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white uppercase">
                Nainix<span className="text-blue-500">Updates</span>
              </span>
            </div>
            
            <p className="text-[15px] leading-relaxed mb-8 max-w-md">
              The premium destination for Indian students and job seekers. Get the fastest, most reliable updates on government jobs, admit cards, and exam results.
            </p>

            {/* Modern Newsletter Input */}
            <div className="flex flex-col gap-3 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Stay Updated</span>
              <div className="relative flex items-center group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full h-12 pl-4 pr-12 rounded-sm bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none placeholder:text-slate-600 focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500"
                />
                <button className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-4 text-[15px] font-medium">
              <li>
                <Link href="/latest-jobs" className="hover:text-blue-400 transition-colors">Govt Jobs</Link>
              </li>
              <li>
                <Link href="/admit-cards" className="hover:text-blue-400 transition-colors">Admit Cards</Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-blue-400 transition-colors">Results</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog & Guides</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-4 text-[15px] font-medium">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Social Connect */}
          <div className="md:col-span-4 lg:col-span-3">
             <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <p className="text-[14px] leading-relaxed mb-6 max-w-sm">
              Join our Telegram channel to get instant notifications directly to your phone.
            </p>
            <a 
              href="https://t.me/yourchannel" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 text-white px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-colors"
            >
              <Send className="h-4 w-4" />
              Join Telegram
            </a>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between border-t border-slate-900 gap-4">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Nainix Updates. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
