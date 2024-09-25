import puppeteer from 'puppeteer';
import { Blog } from './types';

async function scrapeProtocolAIStart(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://protocol.ai/blog/';
    await page.goto(url);
    const blogs = await page.evaluate(() => {
        const blogElements = document.querySelectorAll('article[itemprop="blogPost"]');
        const blogLists:Blog[] = []
        blogElements.forEach(blogElement => {
            const blogDiv = blogElement.children[blogElement.children.length - 1];
            const blogHeader = blogDiv.children[0] as HTMLElement;
            const blogMain = blogDiv.children[1].children[0];
            const blogFooter = blogDiv.children[2] as HTMLElement;
            const title = blogHeader.innerText;
            const link = `https://protocol.ai${blogHeader.children[0].getAttribute('href')}`;
            const author = (blogMain.children[0] as HTMLElement).innerText;
            const date = (blogMain.children[2] as HTMLTimeElement).innerText
            const description = blogFooter.innerText
            const source = "Protocol Labs"
            blogLists.push({title, link, author, date, description, source})
        })
        return blogLists;
    });
    console.log("Protocol AI Blogs", blogs);
    await browser.close();
}

async function scrapeEthereumStart(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://blog.ethereum.org/';
    await page.goto(url);

    const blogs = await page.evaluate(() => {
        const mainElements = document.querySelectorAll('main');
        const blogElements = mainElements[0].children[1]
        const blogLists:Blog[] = [];
        for(const blogElement of blogElements.children){
            const title = (blogElement.children[0].children[1].children[0] as HTMLElement).innerText
            const link = (blogElement.children[0].children[1].children[0].children[0] as HTMLAnchorElement ).href
            const author = (blogElement.children[0].children[1].children[1] as HTMLElement).innerText
            const date = (blogElement.children[0].children[0].children[0].children[0] as HTMLElement).innerText
            const description = (blogElement.children[0].children[1].children[2] as HTMLElement).innerText
            const source = "Ethereum"
            blogLists.push({title, link, author, date, description, source})
        }

        return blogLists;
    });
    console.log("Ethereum Blogs", blogs);
    await browser.close();
}


async function scrapeCoinbaseStart(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.coinbase.com/en-sg/blog/landing/';
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url);
    await page.waitForSelector('div[data-qa="CardGrid"] > div > div')
    const mainElements = await page.$$('div[data-qa="CardGrid"] > div > div')
    const blogLists:Blog[] = [];
    for (const mainElement of mainElements) {
        const blog = await mainElement.evaluate((element) => {
            const blogElement = element.children[1]
            const blogTitleElement = blogElement.children[0].children[0]

            const title = (blogTitleElement.children[0] as HTMLElement).innerText
            const link = (blogTitleElement as HTMLAnchorElement).href         
            const description = blogTitleElement.children.length > 1 
            ? (blogTitleElement.children[1] as HTMLElement)?.innerText ?? "" 
            : "";
            const source ="Coinbase"   
            const author = (blogElement.children[1].children[0] as HTMLElement).innerText.trimEnd().replace(/,$/, '');
            const date = (blogElement.children[1].children[1] as HTMLElement).innerText.trimEnd().replace(/,$/, '');

           return {title,link,source,description,date,author}
        })
        blogLists.push(blog)
    }
    console.log("Coinbase Blogs", blogLists);
    await browser.close();
}

await scrapeEthereumStart();
await scrapeProtocolAIStart();
await scrapeCoinbaseStart();
