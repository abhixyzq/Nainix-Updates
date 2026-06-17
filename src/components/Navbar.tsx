import Link from 'next/link';
import { Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Nainix Updates
          </span>
        </Link>

        {/* Center: Search Bar (Shadcn Style) */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 pl-10 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/admit-cards" className="hidden text-slate-600 transition-colors hover:text-slate-900 sm:block">
            Admit Cards
          </Link>
          <Link href="/results" className="hidden text-slate-600 transition-colors hover:text-slate-900 sm:block">
            Results
          </Link>
          <Link href="/latest-jobs" className="hidden text-slate-600 transition-colors hover:text-slate-900 sm:block">
            Latest Jobs
          </Link>
          
          {/* Mobile Search Trigger Icon */}
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
