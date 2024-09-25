
import { Page } from "puppeteer";
import { Blog } from "../types";

export async function scraperEthereum(page:Page,url:string) {
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
    return blogs
}
