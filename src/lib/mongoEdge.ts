import { MongoClient, ObjectId } from 'mongodb';

// Connect using the standard URI you already have in .env.local!
const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;

export async function fetchFromMongo(action: string, payload: any) {
  if (!uri) {
    console.warn('MONGODB_URI is missing in .env.local');
    return action === 'find' ? { documents: [] } : { document: null };
  }

  if (!client) {
    client = new MongoClient(uri);
  }

  const db = client.db('nainix_db'); // using the default database
  const collection = db.collection('updates');

  let result;

  try {
    if (action === 'find') {
      let cursor = collection.find(payload.filter || {});
      if (payload.sort) cursor = cursor.sort(payload.sort);
      if (payload.limit) cursor = cursor.limit(payload.limit);
      
      const docs = await cursor.toArray();
      // Ensure IDs are strings for Next.js Edge serialization
      result = { documents: docs.map(d => ({ ...d, _id: d._id.toString() })) };
    
    } else if (action === 'findOne') {
      let filter = payload.filter;
      // Convert Data API style $oid back to native ObjectId
      if (filter._id && filter._id.$oid) {
        filter._id = new ObjectId(filter._id.$oid);
      }
      
      const doc = await collection.findOne(filter);
      if (doc) (doc as any)._id = doc._id.toString();
      result = { document: doc };

    } else if (action === 'insertOne') {
      await collection.insertOne(payload.document);
      result = { insertedId: 'ok' };
    }

    return result;
  } catch (error) {
    console.error(`MongoDB ${action} Error:`, error);
    throw error;
  }
}
