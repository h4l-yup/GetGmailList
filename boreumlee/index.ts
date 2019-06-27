import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import * as account from './account.json';
import {Input, Mail} from './interface'

export const getGmailHTML = async ({ id, pw }: Input): Promise<string> => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox');

        await page.waitForSelector('#identifierId', {
            visible: true,
            timeout: 3000,
        });
        await page.type('#identifierId', id);
        await page.click('#identifierNext > span');
        await page.waitForSelector(
            '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input',
            { visible: true, timeout: 3000 },
        );
        await page.type(
            '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input',
            pw,
        );
        await page.waitFor(1000);
        await page.click('#passwordNext > span');
        await page.waitForSelector('body > div:nth-child(18)', {
            visible: true,
            timeout: 5000,
        });

        const html = await page.$eval('body', body => body.outerHTML);

        await browser.close();
        return html;
    } catch (error) {
        return 'Error: ' + error.message;
    }
};

export const getMails = (html: string): Array<Mail> => {
    const $ = cheerio.load(html);

    const mails: Mail[] = $('table.F.cf.zt')
        .find('tr > td.yX.xY > div.afn')
        .map(function() {
            const sender = $(this).find('span.bA4 > span:nth-child(1)').text();
            $('span').remove('.bx0');
            const subject = $(this).find('span:nth-child(2)').text();
            return {sender,subject}
        }).get();

    return mails;
};

export const getGmailList = async (): Promise<Mail[]> => {
    try {
        const html = await getGmailHTML(account);
        const gmailList = getMails(html);
        return gmailList;
    } catch (error) {
        throw new Error(error);
    }
};
