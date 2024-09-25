import {MongoClient} from 'mongodb';
import 'dotenv/config'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database'
async function initDB(){
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const db = client.db('blogdb')
        await db.createCollection('blogs')
        await db.collection('blogs').createIndex({ title: 1 }, { unique: true });
        await db.collection('blogs').createIndex({ author: 1 });
        await db.collection('blogs').createIndex({ source: 1 });
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await client.close()
    }
}

initDB()