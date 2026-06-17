const { MongoClient } = require('mongodb');


async function testDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found');
    return;
  }
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    const db = client.db('nainix_db');
    const collection = db.collection('updates');
    
    const count = await collection.countDocuments();
    console.log(`There are currently ${count} updates in the database.`);
    
    await client.close();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testDB();
