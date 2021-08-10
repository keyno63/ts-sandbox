import {GithubApiIssueData, GithubApiPRData} from "../model/entity/GithubApiData";

export interface GithubRepository {
    getPulls(orgName: string, repoName: string, pageNum: number): Promise<GithubApiPRData[]>
    getIssues(orgName: string, repoName: string, pageNum: number): Promise<GithubApiIssueData[]>
}
