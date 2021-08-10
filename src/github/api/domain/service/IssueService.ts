import {IssueOutputData, PullsOutputData} from "../model/dto/OutputData";

export interface IssueService {
    getPulls(orgName: string, repoName: string, pageNum: number): Promise<PullsOutputData>
    getIssues(orgName: string, repoName: string, pageNum: number): Promise<IssueOutputData>
}
