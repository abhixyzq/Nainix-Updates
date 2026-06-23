'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, GraduationCap, Menu, X, Briefcase, FileCheck, Send, BookOpen } from 'lucide-react';
import { NainixLogo } from '@/components/NainixLogo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20 transition-transform group-hover:scale-105">
            <NainixLogo className="h-6 w-6 fill-current" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
            Nainix<span className="text-blue-600">Updates</span>
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md group/search">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within/search:text-blue-600 transition-colors" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-11 w-full rounded-sm bg-slate-50 border border-slate-200 px-4 py-2 pl-11 text-sm transition-all placeholder:text-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links & CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600 md:flex">
            <Link 
              href="/admit-cards" 
              className="flex items-center gap-1.5 px-3 py-2 hover:text-blue-600 transition-colors relative group"
            >
              <FileCheck className="h-4 w-4" />
              Admit Cards
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/results" 
              className="flex items-center gap-1.5 px-3 py-2 hover:text-blue-600 transition-colors relative group"
            >
              <GraduationCap className="h-4 w-4" />
              Results
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/latest-jobs" 
              className="flex items-center gap-1.5 px-3 py-2 hover:text-blue-600 transition-colors relative group"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center gap-1.5 px-3 py-2 hover:text-blue-600 transition-colors relative group"
            >
              <BookOpen className="h-4 w-4" />
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Telegram CTA */}
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 rounded-sm bg-slate-900 hover:bg-blue-600 px-6 py-2.5 text-xs uppercase tracking-widest font-bold text-white transition-all shadow-sm"
            >
              <Send className="h-4 w-4 fill-current" />
              Join Telegram
            </a>

            {/* Mobile Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="bg-white p-4 border-b border-slate-200 md:hidden animate-in fade-in duration-200">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-12 w-full rounded-sm bg-slate-50 border border-slate-200 px-4 py-2 pl-11 text-sm focus:outline-none text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="bg-white px-4 py-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 border-b border-slate-200 shadow-sm">
          <div className="flex flex-col gap-2">
            <Link 
              href="/admit-cards" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors uppercase tracking-wide border border-transparent hover:border-slate-200"
            >
              <FileCheck className="h-5 w-5 text-slate-400" />
              Admit Cards
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors uppercase tracking-wide border border-transparent hover:border-slate-200"
            >
              <GraduationCap className="h-5 w-5 text-slate-400" />
              Results
            </Link>
            <Link 
              href="/latest-jobs" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors uppercase tracking-wide border border-transparent hover:border-slate-200"
            >
              <Briefcase className="h-5 w-5 text-slate-400" />
              Latest Jobs
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors uppercase tracking-wide border border-transparent hover:border-slate-200"
            >
              <BookOpen className="h-5 w-5 text-slate-400" />
              Blog
            </Link>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm bg-slate-900 py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-blue-600 transition-colors"
              >
                <Send className="h-4 w-4 fill-current" />
                Join Telegram Channel
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
