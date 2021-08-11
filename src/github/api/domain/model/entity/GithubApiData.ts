export class GithubApiPRData {
    id: number
    number: number
    user: string
    state: string
    url: string
    title: string
    createdAt: number
    updatedAt: number
    closedAt: number
    mergedAt: number

    constructor(id: number, number: number, user: string, state:string, url: string, title: string, createdAt: number, updatedAt: number, closedAt: number, mergedAt: number) {
        this.id = id;
        this.number = number;
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

export class GithubApiIssueData {
    id: number
    number: number
    user: string
    assignee: string
    state: string
    url: string
    title: string
    labels: string[]
    createdAt: number
    updatedAt: number
    closedAt: number

    constructor(id: number, number: number, user: string, assignee: string, state: string, url: string, title: string, labels: string[], createdAt: number, updatedAt: number, closedAt: number) {
        this.id = id;
        this.number = number;
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
