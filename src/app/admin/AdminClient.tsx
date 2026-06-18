'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminClient({ initialUpdates }: { initialUpdates: any[] }) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update?')) return;
    
    try {
      const res = await fetch(`/api/admin/updates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUpdates(updates.filter(u => u._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleTriggerScraper = async () => {
    if (!confirm('This will force the AI to fetch new updates from the source website. It may take 1-2 minutes. Proceed?')) return;
    
    setLoading(true);
    try {
      // We pass the CRON secret in headers if needed, or we can just call it
      // Note: If you have a CRON_SECRET configured in Vercel, you need to pass it, or bypass it if we are already admin.
      // For simplicity, we assume we just call the API.
      const res = await fetch('/api/cron/fetch');
      if (res.ok) {
        alert('Scraper ran successfully! Refresh the page to see new updates.');
      } else {
        alert('Scraper failed to run. Check Vercel logs.');
      }
    } catch (error) {
      alert('Error triggering scraper');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Manage all AI-generated jobs and updates</p>
        </div>
        <button 
          onClick={handleTriggerScraper}
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-2.5 font-bold text-white shadow-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Running AI Scraper...' : 'Refresh Data (Trigger Scraper)'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-700 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4">Title</th>
              <th scope="col" className="px-6 py-4">Category</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {updates.length > 0 ? (
              updates.map((item: any) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href={`/admin/edit/${item._id}`} className="font-medium text-blue-600 hover:text-blue-800 mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No updates found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
