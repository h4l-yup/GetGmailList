import * as puppeteer from 'puppeteer';
import * as prompt from 'async-prompt';
import { account } from './interface';

export const id_passowrd_input = async () => {
    const id_password: account = {
        id: '',
        password: ''
    };

    id_password.id = await prompt('id: ');
    id_password.password = await prompt.password('password: ');

    return id_password;
}

export const reday_puppeteer = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 700 });

    return page;
}

export const gmail_page = async (page) => {
    await page.goto('https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
    return page;
}

export const login = async (id_passowrd_input, page) => {
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', id_passowrd_input.id);
    await page.click('#identifierNext');

    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', id_passowrd_input.password);
    await page.click('#passwordNext');

    return page;
}

export const gmail_sender = async (page) => {
    await page.waitForSelector('tbody tr .yW .bA4');
    const senders = await page.$$('tbody tr .yW .bA4');
    const senders_select = await Promise.all(
        senders.map(async function(value){
            return (await value.getProperty('innerText')).jsonValue();
        })
    );
    console.log(senders_select);
    return senders_select;
}

export const gmail_titles_search = async (page) => {
    await page.waitForSelector('tbody tr .bog span');
    const mail_titles = await page.$$('tbody tr .bog span');
    const mail_titles_select = await Promise.all(
        mail_titles.map(async function(value){
            return (await value.getProperty('innerText')).jsonValue();
        })
    );
    console.log(mail_titles_select);
    return mail_titles_select;
 }