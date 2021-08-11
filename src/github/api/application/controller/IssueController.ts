import {IssueService} from "../../domain/service/IssueService";
import {Viewer} from "../presentation/Viewer";
import {Config} from "../../../../config/Config";

export class IssueController {
    service: IssueService
    view: Viewer
    target: { [key: string]: string[] }
    pageNum: number

    constructor(service: IssueService, view: Viewer, config: Config) {
        this.service = service
        this.view = view
        this.target = config.target
        this.pageNum = config.pageNum
    }

    async getIssues() {
        const repoNames: string[][] = []
        for (let org in this.target) {
            const tmp = this.target[org].map(repo => `${org}/${repo}`)
            repoNames.push(tmp)
        }
        this.service
            .getIssues(repoNames.reduce((sum, elm) => sum.concat(elm)), this.pageNum)
            .then(v => this.view.exec(v))
    }
}
