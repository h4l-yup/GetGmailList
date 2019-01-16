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