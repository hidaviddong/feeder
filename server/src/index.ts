
import { insertBlogs } from './db/insert';
import { scraperStart } from './scripts';
try {
    const blogs = await scraperStart()
    await insertBlogs(blogs)
} catch (error) {
    console.log("Scraper Error", error)
}
