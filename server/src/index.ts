import { Cluster }from 'puppeteer-cluster'
import { scraperProtocolLabs,scraperEthereum,scraperCoinbase } from './scripts';
import { COINBASE_URL, ETHEREUM_URL, PROTOCOL_LABS_URL } from './types';

async function scraperStart(){
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 3,
        monitor:true
      });
      await cluster.task(async ({ page, data: url }) => {
        switch (url) {
            case PROTOCOL_LABS_URL:
                await scraperProtocolLabs(page, url);
                break;
            case ETHEREUM_URL:
                await scraperEthereum(page, url);
                break;
            case COINBASE_URL:
                await scraperCoinbase(page, url);
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
}

scraperStart().then(() => {
    console.log("Scraper Done")
}).catch((err) => {
    console.log("Scraper Error", err)
})  
