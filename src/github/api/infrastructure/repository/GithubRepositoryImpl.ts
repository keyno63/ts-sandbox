import axios, {AxiosInstance, AxiosResponse} from "axios";
import {GithubApiIssueResponse, GithubApiPRResponse} from "../../domain/model/dto/GithubApiResponse";
import {GithubApiIssueData, GithubApiPRData} from "../../domain/model/entity/GithubApiData";
import { GithubRepository } from "../../domain/repository/GithubRepository";

const KEY_PULL: string = "pulls"

export class GithubRepositoryImpl implements GithubRepository {
    apiClient: AxiosInstance

    constructor(targetBaseUrl: string) {

        this.apiClient = axios.create({
            baseURL: targetBaseUrl,
            responseType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    public async getPulls(orgName: string, repoName: string, pageNum: number): Promise<GithubApiPRData[]> {
        const response: AxiosResponse = await this.getGithubApi<GithubApiPRResponse>(orgName, repoName, KEY_PULL, pageNum)

        return this.convertPRData(response.data)
    }

    public async getIssues(orgName: string, repoName: string, pageNum: number): Promise<GithubApiIssueData[]> {
        const response: AxiosResponse = await this.getGithubApi<GithubApiIssueResponse>(orgName, repoName, KEY_PULL, pageNum)

        return this.convertIssueData(response.data)
    }

    public async getGithubApi<T = any>(org: string, repo: string, path: string, pageNum: number = 1) {
        const paths = `/${org}/${repo}/${path}`
        const response: AxiosResponse = await this.apiClient
            .get<T[]>(paths, {
            params: {
                per_page: pageNum,
                state: "closed"
            }
        });
        return response
    }

    convertPRData = (data: GithubApiPRResponse[]) => {
        return data.map(pr => {
            return new GithubApiPRData(
                pr.id,
                pr.number,
                pr.user.login,
                pr.state,
                pr.url,
                pr.title,
                this.convertToTime(pr.createdAt),
                this.convertToTime(pr.updatedAt),
                this.convertToTime(pr.closedAt),
                this.convertToTime(pr.mergedAt)
            )
        })
    }

    convertIssueData = (data: GithubApiIssueResponse[]) => {
        return data
            .filter(issue => issue.pull_request === undefined)
            .map(issue => {
                const labels: string[] = issue.labels.map(l => l.name)
                return new GithubApiIssueData(
                    issue.id,
                    issue.number,
                    issue.user.login,
                    issue.assignee,
                    issue.state,
                    issue.url,
                    issue.title,
                    labels,
                    this.convertToTime(issue.createdAt),
                    this.convertToTime(issue.updatedAt),
                    this.convertToTime(issue.closedAt)
                )

        })
    }

    convertToTime = (value: string) => {
        return new Date(value).getTime()
    }
}
