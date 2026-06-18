import { fetchFromMongo } from '@/lib/mongoEdge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EditClient from './EditClient';

export const dynamic = 'force-dynamic';

async function getUpdateDetails(id: string) {
  try {
    const data = await fetchFromMongo('findOne', {
      filter: { _id: { $oid: id } }
    });
    return data?.document;
  } catch (error) {
    return null;
  }
}

export default async function AdminEditPage(props: { params: Promise<{ id: string }> }) {
  const c = await cookies();
  const token = c.get('admin_token')?.value;

  if (token !== 'authenticated') {
    redirect('/admin/login');
  }

  const params = await props.params;
  const update = await getUpdateDetails(params.id);

  if (!update) {
    return <div className="p-8 text-center text-red-500">Update not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <EditClient initialData={update} />
    </div>
  );
}
