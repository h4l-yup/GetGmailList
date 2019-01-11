import { input, puppeteer_ready, connect_page, login, get_sender, get_mail_titles } from '../getMailList';
import { mail, user } from '../interfaces'
import { assert } from 'chai';
import { puppeteer } from '../../node_modules/puppeteer';

describe('### Third assignment ###', function () {
    let id_password: user;
    let page: puppeteer.Page;
    
    it('#1 input id and password', async () => {
        id_password = await input();

        assert.isNotNull(id_password);
    }).timeout(100000);

    it('#2 ready for puppeteer', async () => {
        page = await puppeteer_ready();
        
        assert.isNotNull(page);
    })

    it('#3 connect login page', async () => {
        const result = await connect_page(page);
        let result_status;
        if(result !== null) {
            //사이트에 접속 성공시 status메서드가 200을 반환
            result_status = result.status();
        }

        assert.equal(result_status, 200);
    }).timeout(10000)

    it('#4 login', async () => {
        let error_message;
        try{
            await login(id_password, page);
        } catch(error) {
            error_message = error;
        } finally {
            assert.isUndefined(error_message);
        }

        
    }).timeout(10000)

    let senders;
    it('#5 get sender list', async () => {
        senders = await get_sender(page);
        
        assert.isArray(senders);
    }).timeout(10000)

    let subjects;
    it('#6 get mail title list', async () => {
        subjects = await get_mail_titles(page);
        
        assert.isArray(subjects);
    }).timeout(10000)

    it('#7 output mail list', () => {
        const mails: mail[] = [];

        //메일제목과 보낸사람을 객체배열에 저장
        for (let i = 0; i < subjects.length; i++) {
            mails.push({
                subject: subjects[i],
                sender: senders[i]
            });
        }

        console.log(mails);
        assert.typeOf(mails, 'Array', 'this is not mail Array');
    })
})