export interface CrawlerIO {
    getCredential(): Promise<{ identifier: string, password: string }>;
}