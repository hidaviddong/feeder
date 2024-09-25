import { Page } from "puppeteer";
import { Blog } from "../types";

export async function scraperProtocolLabs(page:Page,url:string){
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
    return blogs
}