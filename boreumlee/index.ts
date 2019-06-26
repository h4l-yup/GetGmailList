import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import * as account from './account.json';

export interface Input {
    id: string;
    pw: string;
}
export interface Mail {
    sender: string;
    subject: string;
}
export interface Output {
    mails: Mail[];
}

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

export const getMails = (html: string): Output => {
    const $ = cheerio.load(html);
    const mails: Mail[] = [];
    const senders: string[] = [];
    const subjects: string[] = [];
    $('table.F.cf.zt')
        .find('div.yW > span.bA4')
        .each(function() {
            senders.push($(this).text());
        });
    $('table.F.cf.zt')
        .find('tr > td.xY.a4W')
        .find('span.bog > span')
        .each(function() {
            subjects.push($(this).text());
        });
    for (let i = 0; senders.length > i; i++) {
        mails.push({
            sender: senders[i],
            subject: subjects[i],
        });
    }

    return { mails };
};

export const getGmailList = async (): Promise<Mail[]> => {
    try {
        const html = await getGmailHTML(account);
        const gmail = getMails(html);
        return gmail.mails;
    } catch (error) {
        throw new Error(error);
    }
};
