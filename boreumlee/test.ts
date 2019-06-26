import { getGmailHTML, getMails, getGmailList } from './index';
import * as account from './account.json';
import * as assert from 'chai';

describe('Gmail list 불러오기', () => {
    describe('getGmailHTML', () => {
        it('gmail account', async () => {
            const html = await getGmailHTML(account);
            assert.assert.isString(html);
            assert.assert.equal(verifyGetGmailHTML(html), true);
        }).timeout(15000);

        it('gmail account 실패', async () => {
            const id = account.id;
            const pw = 'password';
            const html = await getGmailHTML({ id, pw });
            assert.assert.equal(verifyGetGmailHTML(html), false);
        }).timeout(15000);
    });

    describe('getMails', () => {
        it('Gmail html', async () => {
            const html = await getGmailHTML(account);
            const mails = getMails(html);
            assert.assert.equal(verifyMailsLength(mails.mails), true);
        }).timeout(15000);

        it('다른 html', () => {
            const mails = getMails('<html></html>');
            assert.assert.lengthOf(mails.mails, 0);
            assert.assert.equal(verifyMailsLength(mails.mails), false);
        }).timeout(15000);
    });
});

describe('getGmailList', () => {
    it('Lunas Gmail list', async () => {
        const mails = await getGmailList();
        assert.assert.equal(verifyMailsLength(mails), true);
    }).timeout(15000);
});

function verifyGetGmailHTML(html: string): boolean {
    if (html.slice(0, 5) === 'Error') {
        return false;
    }
    return true;
}

function verifyMailsLength(mails: Array<any>): boolean {
    if (mails.length > 0) {
        return true;
    }
    return false;
}
