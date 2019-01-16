const puppeteer = require('puppeteer');

interface input {
    id : string,
    password : string,
}
interface mail {
    sender : string,
    subject : string,
}
interface output{
    mails: mail[],
}

export const getGmailList = async(input:input):Promise<output> => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('https://mail.google.com');

    const ID_INPUT_SEL = '#Email';
    const ID_BTN_SEL = '#next';
    await page.click(ID_INPUT_SEL);
    await page.keyboard.type(input.id);
    await page.click(ID_BTN_SEL);
    
    //network connection이 500ms 안에 하나도 없으면 실행 
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout:100000 });
    
    const PW_INPUT_SEL = '#Passwd';
    const PW_BTN_SEL = '#signIn';
    await page.click(PW_INPUT_SEL);
    await page.keyboard.type(input.password);
    await page.click(PW_BTN_SEL);
    
    // 메일은 request양이 많고 지속적이므로 networkidle0 보다는 dom load만 기다림
    await page.waitForNavigation({waitUntil: 'domcontentloaded',timeout:100000});
    
    const senders = await page.$$eval('.yW', senderDivs => senderDivs.map(div => {
        return div.children[0].children[0].innerText;
        
    }));
    
    const subjects = await page.$$eval('.bog', subjectDivs => subjectDivs.map(div => {
        return div.children[0].innerText;
    }))
    
    const output :output = {mails:[]};

    for(let i=0; i<senders.length; i++){
        output.mails.push({sender: senders[i], subject: subjects[i]}); 
    }
    console.log(output);
    browser.close();
    return output;
};
