// ~/Martin $ ts-mocha test.ts [GOOGLE_ID] [GOOGLE_PW]

import * as puppeteer from 'puppeteer';
import { account, mail } from './interfaces';
import * as _ from 'lodash';

export async function get_browser(): Promise<puppeteer.Browser>{
    try {
        return await puppeteer.launch({headless:true});
    } catch (error) {
        throw error;
    }
}

export async function get_page(browser: puppeteer.Browser): Promise<puppeteer.Page>{
    try {
        return await browser.newPage();
    } catch (error) {
        throw error;
    }
}

export async function google_login(user : account, page: puppeteer.Page): Promise<void>{
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto('https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=AddSession');
    await page.type('#identifierId', user.id);
    await page.click('#identifierNext > content');
    try{
        await page.waitForNavigation({waitUntil:"networkidle0", timeout:2000});
    }catch(error){
        throw error;
    }
    await page.type('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', user.password);
    await page.click('#passwordNext > div.ZFr60d.CeoRYc');
    try{
        await page.waitForSelector('span.bog>span',{visible:true, timeout:5000});
    }catch(error){
        throw error;
    }
}

export async function get_mails(page: puppeteer.Page): Promise<mail[]> {
    const subjects = await page.$$('span.bog>span');
    const subject_texts = await Promise.all(
        subjects.map(value => selectors_text(value))
    );
    const senders = await page.$$('span.yP');
    const sender_texts = await Promise.all(
        senders.map(value => selectors_text(value))
    );
    // const all_promises = _.union(subjects.map(value => selectors_text(value)),sender.map(value => selectors_text(value)));
    // const subject_and_sender_texts = await Promise.all(all_promises);
    // const length = subject_and_sender_texts.length/2;
    // const subject_texts = subject_and_sender_texts.slice(0, length);
    // const sender_texts = subject_and_sender_texts.slice(length);
    if(subject_texts.length === 0 && sender_texts.length === 0 ){
        throw new Error('get_mails fail');
    }

    const mails = subject_texts.map((subject_text, index) => set_mail(subject_text, sender_texts[index]));
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
    try {
        await browser.close();
    } catch (error) {
        throw error;
    }
}