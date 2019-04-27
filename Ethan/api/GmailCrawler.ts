export interface GmailCrawler {
    gmailInit(identifier: string, password: string): Promise<void>;
    getGmailList(): Promise<{ title: string | null; content: string | null }[]>;
}