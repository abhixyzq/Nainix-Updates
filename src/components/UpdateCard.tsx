import Link from 'next/link';
import { Calendar, GraduationCap, ArrowRight } from 'lucide-react';

export interface UpdateCardProps {
  title: string;
  category: string;
  lastDate: string;
  eligibility: string;
  link: string;
}

// Helper function to determine badge colors based on category
function getBadgeColors(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes('result')) {
    return 'bg-emerald-100/80 text-emerald-700 border-emerald-200';
  }
  if (normalized.includes('admit card')) {
    return 'bg-amber-100/80 text-amber-700 border-amber-200';
  }
  // Default to blue for "Sarkari Job" or others
  return 'bg-blue-100/80 text-blue-700 border-blue-200';
}

export function UpdateCard({ title, category, lastDate, eligibility, link }: UpdateCardProps) {
  return (
    <Link 
      href={link} 
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5"
    >
      {/* Top: Category Badge */}
      <div className="mb-4 flex items-start">
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getBadgeColors(category)}`}>
          {category}
        </span>
      </div>

      {/* Middle: Title */}
      <div className="mb-6 flex-1">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h3>
      </div>

      {/* Bottom: Meta Info */}
      <div className="mb-4 flex flex-col gap-2.5 rounded-xl bg-slate-50/80 p-4 text-sm text-slate-600 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate"><span className="font-semibold text-slate-700">Deadline:</span> {lastDate}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <GraduationCap className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate"><span className="font-semibold text-slate-700">Req:</span> {eligibility}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-slate-500 transition-colors group-hover:text-blue-600">
          Read Article
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
