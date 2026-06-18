import { fetchFromMongo } from '@/lib/mongoEdge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

async function getAdminUpdates() {
  try {
    const data = await fetchFromMongo('find', {
      sort: { createdAt: -1 },
      limit: 100 // Fetch a good amount for the admin table
    });
    const updates = data?.documents || [];
    return updates.map((doc: any) => ({
      ...doc,
      _id: doc._id,
    }));
  } catch (error) {
    console.error('Database connection failed:', error);
    return [];
  }
}

export default async function AdminDashboard() {
  const c = await cookies();
  const token = c.get('admin_token')?.value;

  if (token !== 'authenticated') {
    redirect('/admin/login');
  }

  const updates = await getAdminUpdates();

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminClient initialUpdates={updates} />
    </div>
  );
}
