import { id_passowrd_input, reday_puppeteer, gmail_page, login, gmail_sender, gmail_titles_search } from '../g-mail_crawling';
import { account, mail } from '../interface';
import { assert } from 'chai';
import { puppeteer } from '../node_modules/puppeteer';

describe('/// 메일 테스트 ///', function () {
    let id_password: account;
    let page: puppeteer.Page;
    let senders;
    let subjects;

    it('1. id and password', async () => {
        id_password = await id_passowrd_input();

        assert.isNotNull(id_password);
    }).timeout(50000);
    it('2. ready puppeteer', async () => {
        page = await reday_puppeteer();
        
        assert.isNotNull(page);
    })
    it('3. connect login', async () => {
        const result = await gmail_page(page);
        
        assert.isNotNull(result);
    }).timeout(50000)
    it('4. login', async () => {
        let error_message;
        try{
            await login(id_password, page);
        } catch(error) {
            error_message = error;
            assert.isUndefined(error_message);
        }
    }).timeout(50000)
    it('5. get sender list', async () => {
        senders = await gmail_sender(page);
        
        assert.isNotNull(senders);
    }).timeout(50000)
    it('6. mail title list', async () => {
        subjects = await gmail_titles_search(page);
        
        assert.isNotNull(subjects);
    }).timeout(50000)
    it('7. sender and mail title search', () => {
        const mails: mail[] = [];

        for (let i = 0; i < subjects.length; i++) {
            mails.push({
                subject: subjects[i],
                sender: senders[i]
            });
        }

        console.log(mails);
        assert.isNotNull(mails);
    })
})