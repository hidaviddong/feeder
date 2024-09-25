import Cron from 'croner'
import { insertBlogs } from './db/insert'
import { startScraper } from './scraper'


async function main() {
  try {
    const blogs = await startScraper();
    await insertBlogs(blogs);
  } catch (error) {
    console.log("Error:", error);
  }
}

// run the main function immediately
main()

Cron('0 0 */6 * * *', () => {
  main()
});