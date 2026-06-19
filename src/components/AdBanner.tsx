export function AdBanner({ className = '', height = 'min-h-[100px]' }: { className?: string, height?: string }) {
  return (
    <div className={`w-full rounded-3xl bg-neu-light shadow-neu-pressed p-4 flex flex-col items-center justify-center border-2 border-dashed border-neu-accent/20 transition-all ${height} ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-neu-text/40 mb-1">Advertisement</span>
      {/* Real AdSense code will be placed here later */}
      <div className="w-full h-full flex items-center justify-center opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neu-accent"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      </div>
    </div>
  );
}
