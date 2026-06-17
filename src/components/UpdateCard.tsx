import Link from 'next/link';
import { Calendar, GraduationCap } from 'lucide-react';

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
    return 'bg-emerald-100 text-emerald-800';
  }
  if (normalized.includes('admit card')) {
    return 'bg-amber-100 text-amber-800';
  }
  // Default to blue for "Sarkari Job" or others
  return 'bg-blue-100 text-blue-800';
}

export function UpdateCard({ title, category, lastDate, eligibility, link }: UpdateCardProps) {
  return (
    <Link 
      href={link} 
      className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex flex-col h-full gap-4">
        
        {/* Top: Category Badge */}
        <div className="flex items-start">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColors(category)}`}>
            {category}
          </span>
        </div>

        {/* Middle: Title */}
        <div className="flex-1">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Bottom: Meta Info */}
        <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate"><span className="font-medium text-slate-700">Last Date:</span> {lastDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate"><span className="font-medium text-slate-700">Eligibility:</span> {eligibility}</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
