import {IssueService} from "../../domain/service/IssueService";
import {SlackApiSender} from "../presentation/SlackApiSender";

export class IssueController {
    service: IssueService
    view: SlackApiSender
    pageNum: number

    constructor(service: IssueService, view: SlackApiSender) {
        this.service = service
        this.view = view
        // あとで設定ファイルにする
        this.pageNum = 10
    }

    async getIssues(orgName: string, repoName: string) {
        this.service
            .getIssues(orgName, repoName, this.pageNum)
            .then(v => this.view.exec(v))
    }
}
