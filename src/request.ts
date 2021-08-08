import axios, {AxiosResponse} from "axios";

class GithubApiData {
    animalType: string;
    constructor(animalType: string = "Yamamoto") {
        this.animalType = animalType;
    }

    isMiyamoto(): string {
        if (this.animalType === "Miyamoto") {
            return "is Miyamoto";
        }
        return "not Miyamoto";
    }
}

const targetBaseUrl = "https://api.github.com/repos"
const apiClient = axios.create({
    baseURL: targetBaseUrl,
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
});

function dateParseChallenge(key: string, val: any) {
    if (typeof val === "string") {
        const time = Date.parse(val);
        if (!Number.isNaN(time)) {
            return new Date(time);
        }
    }
    return val;
}

type GithubApiPRResponse = {
    id: number
    user: GithubUser
    state: string
    url: string
    title: string
    createdAt: string
    updatedAt: string
    closedAt: string
    mergedAt: string
}

type GithubApiIssueResponse = {
    id: number
    user: GithubUser
    assignee: string
    state: string
    url: string
    title: string
    labels: Label[]
    createdAt: string
    updatedAt: string
    closedAt: string
    pull_request: object
}

class GithubApiPRData {
    id: number
    user: string
    state: string
    url: string
    title: string
    createdAt: number
    updatedAt: number
    closedAt: number
    mergedAt: number

    constructor(id: number, user: string, state:string, url: string, title: string, createdAt: number, updatedAt: number, closedAt: number, mergedAt: number) {
        this.id = id;
        this.user = user;
        this.state = state;
        this.url = url;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.mergedAt = mergedAt;
    }
}

class GithubApiIssueData {
    id: number
    user: string
    assignee: string
    state: string
    url: string
    title: string
    labels: string[]
    createdAt: number
    updatedAt: number
    closedAt: number

    constructor(id: number, user: string, assignee: string, state: string, url: string, title: string, labels: string[], createdAt: number, updatedAt: number, closedAt: number) {
        this.id = id;
        this.user = user;
        this.assignee = assignee;
        this.state = state;
        this.url = url;
        this.title = title;
        this.labels = labels;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
    }
}

type GithubUser = {
    login: string
}

class Label {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

enum State {
    Closed = "closed",
    Open = "open",
    Other = ""
}

const orgName = "ghostdogpr"
const repoName = "caliban"

// method
export const getPRData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await getGithubApi<GithubApiPRResponse>(orgName, repoName, "pulls", pageNum)

    return convertPRData(response.data)
}

export const getIssueData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await getGithubApi<GithubApiIssueResponse>(orgName, repoName, "issues", pageNum)

    return convertIssueData(response.data)
}

async function getGithubApi<T = any>(org: string, repo: string, path: string, pageNum: number = 1) {
    const paths = `/${org}/${repo}/${path}`
    const response: AxiosResponse = await apiClient.get<T[]>(paths, {
        params: {
            per_page: pageNum,
            state: "closed"
        }
    });
    return response
}

const convertPRData = (data: GithubApiPRResponse[]) => {
    return data.map(pr => {
        return new GithubApiPRData(
            pr.id,
            pr.user.login,
            pr.state,
            pr.url,
            pr.title,
            convertToTime(pr.createdAt),
            convertToTime(pr.updatedAt),
            convertToTime(pr.closedAt),
            convertToTime(pr.mergedAt)
        )
    })
}

const convertIssueData = (data: GithubApiIssueResponse[]) => {
    return data.filter(issue => issue.pull_request === undefined)
        .map(issue => {
        const labels = issue.labels
            .map(l => l.name)
        return new GithubApiIssueData(
            issue.id,
            issue.user.login,
            issue.assignee,
            issue.state,
            issue.url,
            issue.title,
            labels,
            convertToTime(issue.createdAt),
            convertToTime(issue.updatedAt),
            convertToTime(issue.closedAt)
        )
    })
}

const convertToTime = (value: string) => {
    return new Date(value).getTime()
}
