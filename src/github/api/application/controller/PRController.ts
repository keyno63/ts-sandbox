import {IssueService} from "../../domain/service/IssueService";
import {Viewer} from "../presentation/Viewer";

export class PRController {
    service: IssueService
    view: Viewer
    pageNum: number

    constructor(service: IssueService, view: Viewer) {
        this.service = service;
        this.view = view;
        // あとで設定ファイルから読み込みにする
        this.pageNum = 10;
    }

    async getPulls(orgName: string, repoName: string) {
        this.service
            .getPulls(orgName, repoName, this.pageNum)
            .then(v => this.view.exec(v))
    }


}