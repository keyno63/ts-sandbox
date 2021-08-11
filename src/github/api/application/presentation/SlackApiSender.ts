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
                return `  ${issue.repository} #${issue.number} "${issue.title}" closed at ${closedTime}`
            }).join("\n")
        if (message) {
            const sendMessage = `recently closed issues:\n${message}`
            this.send(sendMessage)
        } else {
            console.log("not send request to slack")
        }
    }

    public async execPulls(data: PullsOutputData) {
        const message: string = data.pulls
            .map(pull => {
                const closedTime = new Date(pull.closed).toISOString();
                return `  ${pull.repository} #${pull.number} "${pull.title}" closed at ${closedTime}`
            }).join("\n")
        if (message) {
            const sendMessage = `recently closed pulls:\n${message}`
            this.send(sendMessage)
        } else {
            console.log("not send request to slack")
        }
    }

    send(message: string) {
        const data = {
            text: message
        }
        this.sender.post(this.webHookPath, data)
            .then(
                v => console.log(v.data)
            )//.catch(v => console.log("failed to send request. response:" + v.data))
    }

}
