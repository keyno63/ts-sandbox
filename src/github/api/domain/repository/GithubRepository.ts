import {GithubApiIssueData, GithubApiPRData} from "@src/github/api/domain/model/entity/GithubApiData";

export interface GithubRepository {
    getPulls(repoName: string, pageNum: number): Promise<GithubApiPRData[]>
    getIssues(repoName: string, pageNum: number): Promise<GithubApiIssueData[]>
}
