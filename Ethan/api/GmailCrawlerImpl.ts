import * as puppeteer from "puppeteer";
import { GmailCrawler } from "./GmailCrawler";

export class GmailCrawlerImpl implements GmailCrawler {
    gmailUrl: string;
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    constructor() {
        this.gmailUrl = `https://mail.google.com`;
    }

    async gmailInit(identifier: string, password: string): Promise<void> {
        const launchOptions = {
            headless: false
        }
        this.browser = await puppeteer.launch(launchOptions);
        this.page = await this.browser.newPage();
        await this.page.goto(this.gmailUrl);

        const url = await this.page.url();
        if (url.includes('https://accounts.google.com')) {
            await this.googleLogin(identifier, password);
        }
        return;
    }

    private async googleLogin(identifier: string, password: string): Promise<void> {
        console.log('LoginPage Open');

        await this.page.waitForSelector('input[name="identifier"]', { visible: true });
        await this.page.keyboard.type(identifier);
        await this.page.waitForSelector('div[id="identifierNext"]', { visible: true });
        await this.page.click('div[id="identifierNext"]');

        await this.page.waitForSelector('input[name="identifier"]', { hidden: true });

        await this.page.waitForSelector('input[name="password"]', { visible: true });
        await this.page.keyboard.type(password);
        await this.page.waitForSelector('div[id="passwordNext"]', { visible: true });
        await this.page.click('div[id="passwordNext"]');

        return;
    }

    async getGmailList(): Promise<{ title: string | null; content: string | null }[]> {
        console.log('Gmail List Crawling');
        await this.page.waitForSelector('div[class="yW"] span span', { visible: true });

        const list = await this.page.$$('tr[jscontroller="ZdOxDb"]');

        const items = await Promise.all(list.map(async e => {
            const title = await e.$eval('div[class="yW"] span span', e => {
                return e.getAttribute('name');
            })

            const content = await e.$eval('span[class=y2]', e => {
                return e.textContent;
            })

            return { title, content }
        }))

        return items;
    }
}