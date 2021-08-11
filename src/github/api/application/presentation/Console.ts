import {Viewer} from "./Viewer";
import {IssueOutputData, PullsOutputData} from "../../domain/model/dto/OutputData";

// console 出力のみにとどめたい場合はこちらを使っている
export class Console implements Viewer {
    public async exec(data: IssueOutputData) {
        const message: string = data.issues
            .map(issue => {
                const closedTime = new Date(issue.closed).toISOString();
                return `${issue.repository} issue #${issue.number} "${issue.title}" closed at ${closedTime}`
            }).join("\n")
        console.log(message)
    }
    public async execPulls(data: PullsOutputData) {
        const message: string = data.pulls
            .map(pull => {
                const closedTime = new Date(pull.closed).toISOString();
                return `${pull.repository} pull #${pull.number} "${pull.title}" closed at ${closedTime}`
            }).join("\n")
        console.log(message)
    }
}