import axios, {AxiosInstance} from "axios";
import {IssueOutputData} from "../../domain/model/dto/OutputData";
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
                return `#${issue.number} ${issue.title} ${issue.closed}`
            }).join("\n")
        this.send(message)
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
