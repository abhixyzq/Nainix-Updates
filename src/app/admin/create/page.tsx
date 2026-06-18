import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateClient from './CreateClient';

export default async function AdminCreatePage() {
  const c = await cookies();
  const token = c.get('admin_token')?.value;

  if (token !== 'authenticated') {
    redirect('/admin/login');
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <CreateClient />
    </div>
  );
}
