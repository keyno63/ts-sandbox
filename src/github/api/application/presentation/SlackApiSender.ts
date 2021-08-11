import axios, {AxiosInstance} from "axios";
import {IssueOutputData, PullsOutputData} from "../../domain/model/dto/OutputData";
import {Viewer} from "./Viewer";

export class SlackApiSender implements Viewer {

    sender: AxiosInstance
    webHookPath: string

    constructor(path: string) {
        this.webHookPath = path

        this.sender = axios.create({
            baseURL: "https://hooks.slack.com/services",
            responseType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public async exec(data: IssueOutputData) {
        const message: string = data.issues
            .map(issue => {
                const closedTime = new Date(issue.closed).toISOString();
                return `\t${issue.repository} #${issue.number} "${issue.title}" closed at ${closedTime}`
            }).join("\n")
        const dataMessage = message ? message : "Nothing"
        const sendMessage = `recently closed issues:\n${dataMessage}`
        await this.send(sendMessage)
    }

    public async execPulls(data: PullsOutputData) {
        const message: string = data.pulls
            .map(pull => {
                const closedTime = new Date(pull.closed).toISOString();
                return `\t${pull.repository} #${pull.number} "${pull.title}" closed at ${closedTime}`
            }).join("\n")
        const dataMessage = message ? message : "Nothing"
        const sendMessage = `recently closed pulls:\n${dataMessage}`
        await this.send(sendMessage)
    }

    private async send(message: string): Promise<void> {
        const data = {
            text: message
        }
        await this.sender.post(this.webHookPath, data)
    }
}
