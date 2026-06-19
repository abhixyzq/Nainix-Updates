'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, GraduationCap, Menu, X, Bell, Briefcase, FileCheck, Send } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
            <GraduationCap className="h-5.5 w-5.5 transition-transform duration-300 group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 bg-clip-text text-transparent">
            Nainix<span className="text-blue-600 font-medium">Updates</span>
          </span>
        </Link>

        {/* Center: Search Bar (Premium Glassmorphic Style) */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md group/search">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within/search:text-blue-600 transition-colors" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-10 w-full rounded-full border border-slate-200 bg-slate-50/50 px-4 py-2 pl-10 text-sm transition-all placeholder:text-slate-400 hover:bg-slate-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links & CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
            <Link 
              href="/admit-cards" 
              className="flex items-center gap-1.5 rounded-full px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-all duration-200"
            >
              <FileCheck className="h-4 w-4" />
              Admit Cards
            </Link>
            <Link 
              href="/results" 
              className="flex items-center gap-1.5 rounded-full px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-all duration-200"
            >
              <GraduationCap className="h-4 w-4" />
              Results
            </Link>
            <Link 
              href="/latest-jobs" 
              className="flex items-center gap-1.5 rounded-full px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-all duration-200"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Telegram CTA */}
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 active:scale-95 transition-all"
            >
              <Send className="h-3.5 w-3.5 fill-current" />
              Join Telegram
            </a>

            {/* Mobile Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-white p-4 shadow-inner md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <Link 
              href="/admit-cards" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-slate-100/80 px-4 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <FileCheck className="h-5 w-5 text-blue-500" />
              Admit Cards
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-slate-100/80 px-4 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <GraduationCap className="h-5 w-5 text-indigo-500" />
              Results
            </Link>
            <Link 
              href="/latest-jobs" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-slate-100/80 px-4 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <Briefcase className="h-5 w-5 text-emerald-500" />
              Latest Jobs
            </Link>
            
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all mt-2"
            >
              <Send className="h-4 w-4 fill-current" />
              Join Telegram Channel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

