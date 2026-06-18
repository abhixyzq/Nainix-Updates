import { NextRequest, NextResponse } from 'next/server';
import { fetchFromMongo } from '@/lib/mongoEdge';

// Middleware to check authentication
function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token === 'authenticated';
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const result = await fetchFromMongo('deleteOne', { filter: { _id: { $oid: id } } });
    
    return NextResponse.json({ success: true, message: 'Deleted successfully', result });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { _id, ...updateFields } = data;

    if (!_id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const result = await fetchFromMongo('updateOne', {
      filter: { _id: { $oid: _id } },
      update: { $set: updateFields }
    });
    
    return NextResponse.json({ success: true, message: 'Updated successfully', result });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Auto-generate basic fields if missing
    if (!data.createdAt) {
      data.createdAt = new Date().toISOString();
    }
    if (!data.officialLink) {
      data.officialLink = data.applyLink || '#';
    }

    const result = await fetchFromMongo('insertOne', {
      document: data
    });
    
    // Send automatic Telegram notification
    if (result?.insertedId) {
      import('@/lib/telegram').then(m => m.sendTelegramMessage(
        data.title, 
        data.category, 
        result.insertedId
      )).catch(err => console.error("Failed to load Telegram module:", err));
    }
    
    return NextResponse.json({ success: true, message: 'Created successfully', result });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 });
  }
}
