import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // If the user is trying to access /admin/login, don't protect it
  const c = await cookies();
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Admin Header */}
      <header className="bg-slate-900 px-6 py-4 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wide">Nainix <span className="text-blue-400">Admin</span></h2>
          <a href="/" className="text-sm font-medium hover:text-blue-300">View Live Site &rarr;</a>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
