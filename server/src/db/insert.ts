import { getDatabase } from '.';
import { Blog } from '../types';
export async function insertBlogs(blogs: Blog[]) {
    try {
      const db = await getDatabase();
      const collection = db.collection('blogs');
      let insertedCount = 0;
      let skippedCount = 0;
  
      for (const blog of blogs) {
        const existingBlog = await collection.findOne({ title: blog.title });
        if (!existingBlog) {
          await collection.insertOne(blog);
          insertedCount++;
          console.log(`Inserted: ${blog.title}`);
        } else {
          skippedCount++;
          console.log(`Skipped (already exists): ${blog.title}`);
        }
      }
  
      console.log(`Insertion complete. Inserted: ${insertedCount}, Skipped: ${skippedCount}`);
    } catch (error) {
      console.error('Error inserting blogs:', error);
    }
}

