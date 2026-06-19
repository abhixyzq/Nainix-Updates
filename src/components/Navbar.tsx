'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, GraduationCap, Menu, X, Bell, Briefcase, FileCheck, Send } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-neu-light/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(196,198,204,0.3)] border-b border-white/50 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-neu-flat text-neu-accent font-bold transition-all duration-300 group-hover:shadow-neu-pressed">
            <GraduationCap className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-neu-flat-sm"></span>
            </span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-neu-text-heading">
            Nainix<span className="text-neu-accent font-medium">Updates</span>
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md group/search">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neu-text group-focus-within/search:text-neu-accent transition-colors" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-12 w-full rounded-full bg-neu-light shadow-neu-pressed px-4 py-2 pl-12 text-sm transition-all placeholder:text-neu-text/70 text-neu-text-heading focus:outline-none"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links & CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 text-sm font-semibold text-neu-text md:flex">
            <Link 
              href="/admit-cards" 
              className="flex items-center gap-1.5 rounded-full px-5 py-2.5 shadow-neu-flat hover:shadow-neu-pressed hover:text-neu-accent transition-all duration-300"
            >
              <FileCheck className="h-4 w-4" />
              Admit Cards
            </Link>
            <Link 
              href="/results" 
              className="flex items-center gap-1.5 rounded-full px-5 py-2.5 shadow-neu-flat hover:shadow-neu-pressed hover:text-neu-accent transition-all duration-300"
            >
              <GraduationCap className="h-4 w-4" />
              Results
            </Link>
            <Link 
              href="/latest-jobs" 
              className="flex items-center gap-1.5 rounded-full px-5 py-2.5 shadow-neu-flat hover:shadow-neu-pressed hover:text-neu-accent transition-all duration-300"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Telegram CTA */}
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 rounded-full bg-neu-light px-5 py-2.5 text-sm font-bold text-blue-500 shadow-neu-flat hover:shadow-neu-pressed active:scale-95 transition-all"
            >
              <Send className="h-4 w-4 fill-current" />
              Join Telegram
            </a>

            {/* Mobile Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full shadow-neu-flat text-neu-text hover:shadow-neu-pressed md:hidden transition-all"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full shadow-neu-flat text-neu-text hover:shadow-neu-pressed md:hidden transition-all"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="bg-neu-light p-4 shadow-neu-pressed md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neu-text" />
            <input
              type="search"
              placeholder="Search exams, admit cards, or jobs..."
              className="flex h-12 w-full rounded-full bg-neu-light shadow-neu-pressed px-4 py-2 pl-12 text-sm focus:outline-none text-neu-text-heading placeholder:text-neu-text/70"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="bg-neu-light px-4 py-6 shadow-neu-flat md:hidden animate-in fade-in slide-in-from-top-4 duration-300 border-t border-white/20">
          <div className="flex flex-col gap-4">
            <Link 
              href="/admit-cards" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-2xl shadow-neu-flat px-5 py-4 text-[15px] font-semibold text-neu-text hover:shadow-neu-pressed hover:text-neu-accent transition-all"
            >
              <FileCheck className="h-5 w-5 text-neu-accent" />
              Admit Cards
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-2xl shadow-neu-flat px-5 py-4 text-[15px] font-semibold text-neu-text hover:shadow-neu-pressed hover:text-neu-accent transition-all"
            >
              <GraduationCap className="h-5 w-5 text-neu-accent" />
              Results
            </Link>
            <Link 
              href="/latest-jobs" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-2xl shadow-neu-flat px-5 py-4 text-[15px] font-semibold text-neu-text hover:shadow-neu-pressed hover:text-neu-accent transition-all"
            >
              <Briefcase className="h-5 w-5 text-neu-accent" />
              Latest Jobs
            </Link>
            
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-neu-light py-4 text-center text-sm font-bold text-blue-500 shadow-neu-flat hover:shadow-neu-pressed active:scale-[0.98] transition-all mt-4"
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
