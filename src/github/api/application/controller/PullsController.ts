import {GithubApiService} from "../../domain/service/GithubApiService";
import {Viewer} from "../presentation/Viewer";
import {IConfig} from "config";

export class PullsController {
    service: GithubApiService
    view: Viewer
    target: { [key: string]: string[] }
    pageNum: number

    constructor(service: GithubApiService, view: Viewer, config: IConfig) {
        this.service = service;
        this.view = view;
        this.target = config.get("target.repos")
        this.pageNum = config.get("request.pageNum")
    }

    async getPulls() {
        const repoNames: string[][] = []
        for (let org in this.target) {
            const tmp = this.target[org].map(repo => `${org}/${repo}`)
            repoNames.push(tmp)
        }
        this.service
            .getPulls(repoNames.reduce((sum, elm) => sum.concat(elm)), this.pageNum)
            .then(v => this.view.execPulls(v))
    }
}