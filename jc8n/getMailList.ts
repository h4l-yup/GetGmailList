import * as puppeteer from 'puppeteer';
import * as prompt from 'async-prompt';
import { user } from './interfaces';


//이메일, 비밀번호 입력받는 함수
export const input = async (): Promise<user> => {
  const login_information: user = {
    email: '',
    password: ''
  };

  login_information.email = await prompt('email : ');
  login_information.password = await prompt.password('password : ');

  return login_information;
}

//###1 puppeteer 준비
export const puppeteer_ready = async (): Promise<puppeteer.Page> => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  //화면크기 지정
  await page.setViewport({ width: 1280, height: 800 })

  return page;
}

//###2 구글 로그인 페이지 접속
export const connect_page = async (page: puppeteer.Page): Promise<puppeteer.Response | null> => {
  const result = await page.goto('https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=AddSession');

  return result;
}

//###3 아이디 비밀번호 입력 후 로그인
export const login = async (user_information: user, page: puppeteer.Page): Promise<void> => {
  //await navigationPromise

  //메일주소 입력 후 다음버튼 클릭
  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', user_information.email)
  await page.click('#identifierNext')

  //비밀번호 입력 후 다음버튼 클릭
  try {
    await page.waitForSelector('input[type="password"]', { visible: true,  timeout: 2000})
  } catch (error) {
    throw error
  }
  await page.type('input[type="password"]', user_information.password)
  await page.click('#passwordNext')
}

//###4 보낸사람 추출
export const get_sender = async (page: puppeteer.Page): Promise<string[]> => {
  await page.waitForSelector('tbody tr .yW .bA4 span');
  const senders: string[] = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('tbody tr .yW .bA4 span'));
    return anchors.map(anchor => anchor.textContent);
  });

  return senders;
}

//###5 메일제목 추출
export const get_mail_titles = async (page: puppeteer.Page): Promise<string[]> => {
  await page.waitForSelector('tbody tr .bog span');
  const mail_titles: string[] = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('tbody tr .bog span'));
    return anchors.map(anchor => anchor.textContent);
  });

  return mail_titles;
}