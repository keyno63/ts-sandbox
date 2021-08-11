import {IssueOutputData, PullsOutputData} from "../model/dto/OutputData";

export interface IssueService {
    getPulls(repoNames: string[], pageNum: number): Promise<PullsOutputData>
    getIssues(repoNames: string[], pageNum: number): Promise<IssueOutputData>
}
