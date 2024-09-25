import { closeConnection, getDatabase } from ".";

async function initDB(){
    try {
        const db = await getDatabase()
        await db.createCollection('blogs')
        await db.collection('blogs').createIndex({ title: 1 }, { unique: true });
        await db.collection('blogs').createIndex({ author: 1 });
        await db.collection('blogs').createIndex({ source: 1 });
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await closeConnection();
    }
}

initDB()