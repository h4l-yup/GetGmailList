export interface GmailCrawler {
    getCredential(): Promise<{ identifier: string, password: string }>;
    gmailInit(identifier: string, password: string): Promise<void>;
    getGmailList(): Promise<{subject: string | null,  sender: string | null }[]>;
}