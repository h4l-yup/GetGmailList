const expect = require("chai");
const GmailCrawlerImpl = require('./api/GmailCrawlerImpl');
const { identifier, password } = require('./auth.json');

describe("puppeteer", () => {

    it("will open google", async () => {
    
        console.log('app is running..');
        const gmailCrawler = new GmailCrawlerImpl();
        await gmailCrawler.google(identifier, password);
    });
});

// describe("contents", () => {
//   const result1 = keyword();
//   it("will return array", async () => {
//     const result = await contents(result1);
//     assert.equal(typeof result, "object");
//   });
// });
