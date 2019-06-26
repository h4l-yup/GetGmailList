# GetGmailList
Get the list of mail with TypeScript &amp; Puppeteer &amp; TS-Mocha

# 과제 시작
- 자신의 github으로 해당 repo를 fork 떠간다.
- fork 떠 간 repo에서 branch를 새로 생성한다.
- 생성한 branch에서 자신의 github 계정 이름으로 최상단에 폴더를 생성하고 `Example` 폴더 내용을 해당 폴더에 복사한 후 과제를 시작한다.
  
# 과제
- 아래에 있는 input과 output 형식에 맞는 함수를 만드세요.
```
// input
{
    id: string,
    password: string,
}

// output (mail[])
mails: [
        {
            subject: string,
            sender: string,
        },
        {
            subject: string,
            sender: string,
        },
        ...
]
```
- request를 사용하지 않고 puppeteer를 사용합니다.
- input과 ouput에 해당하는 interface를 작성합니다.
- test framework로는 mocha를 사용합니다. (ts-mocha)
- id와 password는 개인정보이므로 코드에 직접 추가하지 않고 mocha를 사용해 test를 실행할 때 cli에서 argument로 받도록 합니다.
- 동작하지 않는 경우의 테스트 코드도 작성합니다. 

# 과제 제출
- 완성한 과제를 PR을 통해 제출하되 master branch가 아닌 자신의 이름으로 된 branch에 PR 합니다.

# 과제 동작시
- account.json을 만들어야 동작이 됩니다. 