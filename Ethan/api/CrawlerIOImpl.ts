import { CrawlerIO } from "./CrawlerIO";
import * as readline from "readline";

export class CrawlerIOImpl implements CrawlerIO {
    async getCredential(): Promise<{ identifier: string, password: string }> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const identifier: string = await new Promise((resolve, _reject) => {
            console.log('gmail : ');
            rl.on('line', (line) => {
                resolve(line)
            }).on('close', () => {
                process.exit()
            })
        })
        const password: string = await new Promise((resolve, _reject) => {
            console.log('password : ');
            rl.on('line', (line) => {
                resolve(line)
            }).on('close', () => {
                process.exit()
            })
        })

        return { identifier, password };
    }
}