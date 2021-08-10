import axios, {AxiosInstance} from "axios";

export class SlackApiSender {

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
    async send(message: string) {
        const data = {
            text: message
        }
        this.sender.post(this.webHookPath, data)
            .then(
                v => console.log(v.data)
            ).catch(v => console.log("failed to send request. response:" + v.data))
    }

}
