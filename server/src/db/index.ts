import 'dotenv/config'
import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('blogdb');

  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  if (!db) {
    await connectToDatabase();
  }
  return db!;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
