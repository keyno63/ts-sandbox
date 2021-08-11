import {IssueService} from "../../domain/service/IssueService";
import {Viewer} from "../presentation/Viewer";

export class IssueController {
    service: IssueService
    view: Viewer
    pageNum: number

    constructor(service: IssueService, view: Viewer) {
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
