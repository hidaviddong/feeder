import { Page } from "puppeteer";
import { Blog } from "../types";

export async function scraperCoinbase(page:Page,url:string){
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url);
    await page.waitForSelector('div[data-qa="CardGrid"] > div > div')
    const mainElements = await page.$$('div[data-qa="CardGrid"] > div > div')
    const blogs:Blog[] = [];
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
    });
        blogs.push(blog)
    }
    return blogs
}
