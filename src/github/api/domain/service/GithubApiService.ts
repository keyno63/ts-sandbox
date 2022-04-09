import {IssueOutputData, PullsOutputData} from "@src/github/api/domain/model/dto/OutputData";

export interface GithubApiService {
    getPulls(repoNames: string[], pageNum: number, span: number): Promise<PullsOutputData>
    getIssues(repoNames: string[], pageNum: number, span: number): Promise<IssueOutputData>
}
