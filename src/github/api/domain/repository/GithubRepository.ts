import {GithubApiIssueData, GithubApiPRData} from "../model/entity/GithubApiData";

export interface GithubRepository {
    getPulls(repoName: string, pageNum: number): Promise<GithubApiPRData[]>
    getIssues(repoName: string, pageNum: number): Promise<GithubApiIssueData[]>
}
