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

function call() {
    const v : GithubApiData = new GithubApiData();
    console.log(v.isMiyamoto());

    const v1 : GithubApiData = new GithubApiData("Miyamoto");
    console.log(v1.isMiyamoto());
}

const targetBaseUrl = "https://api.github.com/repos"
const apiClient = axios.create({
    baseURL: targetBaseUrl,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
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
    created_at: string
    updated_at: string
    closed_at: string
    merged_at: string
}

type GithubApiIssueResponse = {
    id: number
    user: GithubUser
    assignee: string
    state: string
    url: string
    title: string
    labels: Array<Label>
    created_at: string
    updated_at: string
    closed_at: string
    pull_request: Object
}

class GithubApiPRData {
    id: number
    user: string
    state: string
    url: string
    title: string
    created_at: number
    updated_at: number
    closed_at: number
    merged_at: number

    constructor(id: number, user: string, state:string, url: string, title: string, created_at: number, updated_at: number, closed_at: number, merged_at: number) {
        this.id = id;
        this.user = user;
        this.state = state;
        this.url = url;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.closed_at = closed_at;
        this.merged_at = merged_at;
    }
}

class GithubApiIssueData {
    id: number
    user: string
    assignee: string
    state: string
    url: string
    title: string
    labels: Array<string>
    created_at: number
    updated_at: number
    closed_at: number

    constructor(id: number, user: string, assignee: string, state: string, url: string, title: string, labels: Array<string>, created_at: number, updated_at: number, closed_at: number) {
        this.id = id;
        this.user = user;
        this.assignee = assignee;
        this.state = state;
        this.url = url;
        this.title = title;
        this.labels = labels;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.closed_at = closed_at;
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
    Closed = 'closed',
    Open = 'open',
    Other = ''
}

const orgName = "ghostdogpr"
const repoName = "caliban"

// method
export const getPRData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await getGithubApi<GithubApiPRResponse>(orgName, repoName, 'pulls', pageNum)

    return convertPRData(response.data)
}

export const getIssueData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await getGithubApi<GithubApiIssueResponse>(orgName, repoName, 'issues', pageNum)

    return convertIssueData(response.data)
}

async function getGithubApi<T = any>(org: string, repo: string, path: string, pageNum: number = 1) {
    const paths = `/${org}/${repo}/${path}`
    const response: AxiosResponse = await apiClient.get<Array<T>>(paths, {
        params: {
            per_page: pageNum,
            state: "closed"
        }
    });
    return response
}

const convertPRData = (data: Array<GithubApiPRResponse>) => {
    return data.map(pr => {
        return new GithubApiPRData(
            pr.id,
            pr.user.login,
            pr.state,
            pr.url,
            pr.title,
            convertToTime(pr.created_at),
            convertToTime(pr.updated_at),
            convertToTime(pr.closed_at),
            convertToTime(pr.merged_at)
        )
    })
}

const convertIssueData = (data: Array<GithubApiIssueResponse>) => {
    return data.filter(issue => issue.pull_request === undefined)
        .map(issue => {
        //console.log(issue);
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
            convertToTime(issue.created_at),
            convertToTime(issue.updated_at),
            convertToTime(issue.closed_at)
        )
    })
}

const convertToTime = (value: string) => {
    return new Date(value).getTime()
}
