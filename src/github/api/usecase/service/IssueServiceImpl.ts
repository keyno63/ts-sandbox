import {IssueService} from "../../domain/service/IssueService";
import {GithubApiIssueData, GithubApiPRData} from "../../domain/model/entity/GithubApiData";
import {GithubRepository} from "../../domain/repository/GithubRepository";
import {Pulls, PullsOutputData} from "../../domain/model/dto/OutputData";

export class IssueServiceImpl implements IssueService {
    repository: GithubRepository

    constructor(repository: GithubRepository) {
        this.repository = repository;
    }

    public getPulls(orgName: string, repoName: string, pageNum: number): Promise<PullsOutputData> {
        const dt = new Date()
        dt.setDate(dt.getDate() - 7)

        return this.repository.getPulls(orgName, repoName, pageNum)
            .then(prs => {
                const filteredPulls = prs
                    .filter(pr => IssueServiceImpl.filterLimit(pr.state, pr.closedAt, dt.getTime()))
                    .map(filtered => new Pulls(
                        repoName,
                        filtered.number,
                        filtered.user,
                        filtered.title,
                        filtered.closedAt
                    ))
                return new PullsOutputData(filteredPulls)
            })
    }

    public getIssues(orgName: string, repoName: string, pageNum: number): GithubApiIssueData[] {
        // TODO: impl
        return [];
    }

    private static filterLimit(state: string, closed: number, limit: number): boolean {
        return state === "closed" && closed > limit
    }
}
