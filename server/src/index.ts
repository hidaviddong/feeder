import { Cluster }from 'puppeteer-cluster'
import { scraperProtocolLabs,scraperEthereum,scraperCoinbase } from './scripts';
import { Blog, COINBASE_URL, ETHEREUM_URL, PROTOCOL_LABS_URL } from './types';

async function scraperStart(){
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 3,
        monitor:true
      });
     const blogs:Blog[] = []
      await cluster.task(async ({ page, data: url }) => {
        switch (url) {
            case PROTOCOL_LABS_URL:
                const protocolLabsBlogs =  await scraperProtocolLabs(page, url);
                blogs.push(...protocolLabsBlogs)
                break;
            case ETHEREUM_URL:
                const ethereumBlogs = await scraperEthereum(page, url);
                blogs.push(...ethereumBlogs)
                break;
            case COINBASE_URL:
                const coinbaseBlogs = await scraperCoinbase(page, url);
                blogs.push(...coinbaseBlogs)
                break;
            default:
                break;
        }
      });
    
      cluster.queue(PROTOCOL_LABS_URL);
      cluster.queue(ETHEREUM_URL);
      cluster.queue(COINBASE_URL)
    
      await cluster.idle();
      await cluster.close();

      return blogs
}

try {
    const res = await scraperStart()
    console.log(res)
} catch (error) {
    console.log("Scraper Error", error)
}
