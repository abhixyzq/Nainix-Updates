import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://nainixdev_db_user:ZjvNxicvG5bnTR@cluster0.bwmxt5o.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('nainix_db');
    const collection = db.collection('updates');
    
    const docId = '6a35dff83068b8011dc9529f';
    const doc = await collection.findOne({ _id: new ObjectId(docId) });
    
    if (doc) {
      console.log('Found document:', doc.title);
      let newContent = doc.content.replace(/<td rowspan="3"[^>]*>([\s\S]*?)<\/td>/g, '$1');
      
      // We also need to fix the missing columns. 
      // The markdown for the rows probably looks like this:
      // | Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA) | 3,522 | Passed 10+2 Intermediate Exam from any recognized board in India. |
      // | Postal Assistant (PA) / Sorting Assistant | Passed 10+2 Intermediate Exam from any recognized board in India. |
      // | Data Entry Operators (DEOs) | Passed 10+2 Intermediate Exam from any recognized board in India. |
      
      // Let's replace the 2-column rows to have 3 columns by inserting "3,522" in the middle.
      newContent = newContent.replace(/\| Postal Assistant \(PA\) \/ Sorting Assistant \| Passed 10\+2 Intermediate Exam from any recognized board in India\. \|/g, '| Postal Assistant (PA) / Sorting Assistant | 3,522 | Passed 10+2 Intermediate Exam from any recognized board in India. |');
      newContent = newContent.replace(/\| Data Entry Operators \(DEOs\) \| Passed 10\+2 Intermediate Exam from any recognized board in India\. \|/g, '| Data Entry Operators (DEOs) | 3,522 | Passed 10+2 Intermediate Exam from any recognized board in India. |');

      await collection.updateOne(
        { _id: new ObjectId(docId) },
        { $set: { content: newContent } }
      );
      console.log('Document updated successfully.');
    } else {
      console.log('Document not found!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

run();
