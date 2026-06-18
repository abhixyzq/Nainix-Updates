'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function AdminClient({ initialUpdates }: { initialUpdates: any[] }) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      const res = await fetch('/api/cron/fetch');
      if (res.ok) {
        alert('Scraper ran successfully! Refresh the page to see new updates.');
      } else {
        alert('Scraper failed to run. Check limits or logs.');
      }
    } catch (error) {
      alert('Error triggering scraper');
    }
    setLoading(false);
  };

  // Compute Stats
  const totalUpdates = updates.length;
  const totalJobs = updates.filter(u => u.category?.toLowerCase().includes('job')).length;
  const totalAdmitCards = updates.filter(u => u.category?.toLowerCase().includes('admit card')).length;
  const totalResults = updates.filter(u => u.category?.toLowerCase().includes('result')).length;

  // Filter Data
  const filteredUpdates = useMemo(() => {
    let filtered = updates;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(u => u.category?.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (searchTerm) {
      filtered = filtered.filter(u => u.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [updates, searchTerm, selectedCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUpdates.length / itemsPerPage) || 1;
  const paginatedUpdates = filteredUpdates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Manage all AI-generated jobs and updates</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/create" className="rounded-lg bg-blue-600 px-6 py-2.5 font-bold text-white shadow-md hover:bg-blue-700 transition-colors">
            + Create Post
          </Link>
          <button 
            onClick={handleTriggerScraper}
            disabled={loading}
            className="rounded-lg bg-green-600 px-6 py-2.5 font-bold text-white shadow-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Running AI Scraper...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Total Updates</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{totalUpdates}</div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="text-sm font-medium text-blue-600">Latest Jobs</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">{totalJobs}</div>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <div className="text-sm font-medium text-green-600">Admit Cards</div>
          <div className="mt-2 text-3xl font-bold text-green-900">{totalAdmitCards}</div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <div className="text-sm font-medium text-red-600">Results</div>
          <div className="mt-2 text-3xl font-bold text-red-900">{totalResults}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <input 
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="flex-1 rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select 
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          className="rounded-lg border border-slate-300 p-2.5 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Job">Latest Jobs</option>
          <option value="Admit Card">Admit Cards</option>
          <option value="Result">Results</option>
        </select>
      </div>

      {/* Data Table */}
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
            {paginatedUpdates.length > 0 ? (
              paginatedUpdates.map((item: any) => (
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
                    {new Date(item.createdAt).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
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
                  No updates found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredUpdates.length)}</span> of <span className="font-medium text-slate-900">{filteredUpdates.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
