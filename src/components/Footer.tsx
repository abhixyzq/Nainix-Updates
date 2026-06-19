import Link from 'next/link';
import { Send, Globe, MessageCircle, Share2, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#151923] border-t border-white/5 mt-12 relative overflow-hidden rounded-t-[3rem]">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 py-16 md:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          {/* Brand & Newsletter (Takes up 5 columns on desktop) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-[5px_5px_10px_#0e1017,-5px_-5px_10px_#1c222f] text-blue-400 font-bold border border-white/5">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Nainix<span className="text-blue-500 font-medium">Updates</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-400 mb-8 max-w-sm">
              The official, premium, and trusted portal for Indian students and job seekers. Find the latest education updates, admit cards, government jobs, and exam results.
            </p>

            {/* Dark Neumorphic Newsletter Input */}
            <div className="flex flex-col gap-3 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Subscribe to Alerts</span>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-12 pl-5 pr-14 rounded-full bg-[#151923] shadow-[inset_4px_4px_8px_#0e1017,inset_-4px_-4px_8px_#1c222f] text-sm text-white focus:outline-none placeholder:text-slate-500 border border-transparent focus:border-blue-500/30 transition-colors"
                />
                <button className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full bg-[#151923] shadow-[4px_4px_8px_#0e1017,-4px_-4px_8px_#1c222f] text-blue-400 hover:shadow-[inset_2px_2px_5px_#0e1017,inset_-2px_-2px_5px_#1c222f] transition-all active:scale-95 border border-white/5">
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
              Explore
            </h4>
            <ul className="space-y-4 text-[15px] font-medium text-slate-400">
              <li>
                <Link href="/latest-jobs" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Govt Jobs
                </Link>
              </li>
              <li>
                <Link href="/admit-cards" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Admit Cards
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
              Legal
            </h4>
            <ul className="space-y-4 text-[15px] font-medium text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2">
             <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#151923] shadow-[4px_4px_8px_#0e1017,-4px_-4px_8px_#1c222f] text-slate-400 hover:text-blue-400 hover:shadow-[inset_2px_2px_5px_#0e1017,inset_-2px_-2px_5px_#1c222f] transition-all border border-white/5">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#151923] shadow-[4px_4px_8px_#0e1017,-4px_-4px_8px_#1c222f] text-slate-400 hover:text-blue-400 hover:shadow-[inset_2px_2px_5px_#0e1017,inset_-2px_-2px_5px_#1c222f] transition-all border border-white/5">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#151923] shadow-[4px_4px_8px_#0e1017,-4px_-4px_8px_#1c222f] text-slate-400 hover:text-pink-400 hover:shadow-[inset_2px_2px_5px_#0e1017,inset_-2px_-2px_5px_#1c222f] transition-all border border-white/5">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>
          
        </div>

        {/* Dark Pressed Copyright Section */}
        <div className="mt-16 rounded-3xl bg-[#151923] shadow-[inset_4px_4px_8px_#0e1017,inset_-4px_-4px_8px_#1c222f] p-6 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-slate-500 border border-white/5">
          <p>&copy; {new Date().getFullYear()} Nainix. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span>Made with</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
