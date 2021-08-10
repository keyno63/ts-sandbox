import {IssueService} from "../../domain/service/IssueService";

export class PRController {
    service: IssueService
    pageNum: number

    constructor(service: IssueService) {
        this.service = service;
        // あとで設定ファイルから読み込みにする
        this.pageNum = 10;
    }

    async getPulls(orgName: string, repoName: string) {
        this.service
            .getPulls(orgName, repoName, this.pageNum)
            .then(
                v => v.pulls.map(
                    pull => {
                        return "#"
                    }
                )

            )
    }


}