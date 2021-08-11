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
                return `#${issue.number} "${issue.title}" ${closedTime}`
            }).join("\n")
        this.send(message)
    }

    public async execPulls(data: PullsOutputData) {
        const message: string = data.pulls
            .map(pull => {
                const closedTime = new Date(pull.closed).toISOString();
                return `#${pull.number} "${pull.title}" ${closedTime}`
            }).join("\n")
        if (message) {
            this.send(message)
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
