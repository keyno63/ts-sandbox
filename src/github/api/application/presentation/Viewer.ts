import {IssueOutputData, OutputData, PullsOutputData} from "../../domain/model/dto/OutputData";

export interface Viewer {
    exec(data: IssueOutputData): void
    execPulls(data: PullsOutputData): void
}
