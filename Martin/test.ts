import { account } from './interfaces'
import { get_page, google_login, get_browser, close_browser, get_mails } from "./google_mail";
import { fail } from 'assert';

let browser ;
let page;

const account: account = {
	id: process.argv[5],
	password: process.argv[6],
};

describe('start program', function() {
	it('get brower', async function() {
		try {
			browser = await get_browser();
		} catch (error) {
			fail(error);
		}
		console.log('browser : ' + browser);
	});
	it('get page', async function() {
		try {
			page = await get_page(browser);
		} catch (error) {
			fail(error);
		}
		console.log('page : ' + page);
	});
	it('login google', async function() {
		try {
			await google_login(account, page);
		} catch (error) {
			fail(error);
		}
	}).timeout(10000);
	it('get mails', async function() {
		try {
			const mails = await get_mails(page);
			console.log(mails);
		} catch (error) {
			fail(error);
		}
	});
	it('close browser', async function() {
		try {
			await close_browser(browser);
		} catch (error) {
			fail(error);
		}
	});
});