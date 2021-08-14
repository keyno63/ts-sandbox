import {GithubApiService} from "../../domain/service/GithubApiService";
import {GithubRepository} from "../../domain/repository/GithubRepository";
import {Issue, IssueOutputData, Pulls, PullsOutputData} from "../../domain/model/dto/OutputData";

export class GithubApiServiceImpl implements GithubApiService {
    repository: GithubRepository

    constructor(repository: GithubRepository) {
        this.repository = repository;
    }
    public async getPulls(repoNames: string[], pageNum: number, span: number): Promise<PullsOutputData> {
        const dt = new Date()
        dt.setDate(dt.getDate() - span)

        const responses = repoNames.map(repoName =>
            this.repository.getPulls(repoName, pageNum)
                .then(prs =>
                        prs
                        .filter(pr =>
                            GithubApiServiceImpl.filterLimit(pr.state, pr.closedAt, dt.getTime()))
                        .map(filtered => {
                            return new Pulls(
                                repoName,
                                filtered.number,
                                filtered.user,
                                filtered.title,
                                filtered.closedAt
                            )
                        })
                )
        )
        const ret = await Promise.all(responses)
        return new PullsOutputData(ret.reduce((sum, elm) => sum.concat(elm), []))
    }

    public async getIssues(repoNames: string[], pageNum: number, span: number): Promise<IssueOutputData> {
        const dt = new Date()
        dt.setDate(dt.getDate() - span)

        const responses = repoNames.map(repoName =>
            this.repository.getIssues(repoName, pageNum)
                .then(issues =>
                    issues
                        .filter(issue =>
                            GithubApiServiceImpl.filterLimit(issue.state, issue.closedAt, dt.getTime()))
                        .map(filtered => new Issue(
                            repoName,
                            filtered.number,
                            filtered.title,
                            filtered.labels,
                            filtered.closedAt
                        ))
                )
        )
        const ret = await Promise.all(responses)
        return new IssueOutputData(ret.reduce((sum, elm) => sum.concat(elm), []))
    }

    private static filterLimit(state: string, closed: number, limit: number): boolean {
        return state === "closed" && closed > limit
    }
}
