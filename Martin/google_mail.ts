// ~/Martin $ ts-mocha test.ts [GOOGLE_ID] [GOOGLE_PW]

import * as puppeteer from 'puppeteer';
import { account, mail } from './interfaces';

export async function get_browser(): Promise<puppeteer.Browser>{
    return await puppeteer.launch({headless:true})
        .catch(error => {throw error});
}

export async function get_page(browser: puppeteer.Browser): Promise<puppeteer.Page>{
    return await browser.newPage()
        .catch(error => {throw error});;
}

export async function google_login(user : account, page: puppeteer.Page): Promise<void>{
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto('https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=AddSession');
    await page.type('#identifierId', user.id);
    await page.click('#identifierNext > content');
    await page.waitForNavigation({waitUntil:"networkidle0", timeout:3000})
        .catch(error => {throw error});;
    await page.type('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', user.password);
    await page.click('#passwordNext > div.ZFr60d.CeoRYc');
    await page.waitForSelector('span.bog>span',{visible:true, timeout:6000})
        .catch(error => {throw error});
}

export async function get_mails(page: puppeteer.Page) {
    const mail_elements = await page.$$('span.bog>span, tbody tr .yW .bA4 span');
    const element_texts = await Promise.all(
        mail_elements.map(mail_elements => selectors_text(mail_elements))
    );
    const mails = element_texts.map(
        (element_text, index) => index%2===0?set_mail(element_texts[index+1], element_text):0
    ).filter(mail => mail!==0);
    
    return mails;
}

async function selectors_text(selector : puppeteer.ElementHandle<Element>): Promise<any>{
    const value_handle = await selector.getProperty('innerText');
    return value_handle.jsonValue();
}

function set_mail(subject_value: string, sender_value: string): mail{ 
    return {subject:subject_value, sender:sender_value};
}

export async function close_browser(browser : puppeteer.Browser): Promise<void>{
    await browser.close()
        .catch(error => {throw error});
}