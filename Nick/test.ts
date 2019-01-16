const getGmail = require('./getGmailList');
const assert = require('chai').assert;

const input = {id:process.argv[5], password:process.argv[6]};
describe('test for getGmailList', ()=>{
    it('output has property mails which is array of mail', async()=>{
        const output = await getGmail.getGmailList(input);
        assert.isArray(output.mails);
        assert.isNotEmpty(output.mails);        
        output.mails.forEach(mail => {
            assert.isObject(mail);
            assert.hasAllKeys(mail, ['sender', 'subject']);
        })
    }).timeout(100000);
    it('wrong input must not return appropriate output', async()=>{
        const wrongInput = {id :'A', password: 'B'};
        const wrongOutput = await getGmail.getGmailList(wrongInput);
        assert.isArray(wrongOutput.mails);
        assert.isNotEmpty(wrongOutput.mails);
        wrongOutput.mails.forEach(mail => {
            assert.isObject(mail);
            assert.hasAllKeys(mail, ['sender', 'subject']);
        })
    }).timeout(100000);
})