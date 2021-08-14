import {IssueOutputData, PullsOutputData} from "../model/dto/OutputData";

export interface GithubApiService {
    getPulls(repoNames: string[], pageNum: number, span: number): Promise<PullsOutputData>
    getIssues(repoNames: string[], pageNum: number, span: number): Promise<IssueOutputData>
}
