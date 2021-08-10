export type GithubApiPRResponse = {
    id: number
    number: number
    user: GithubUser
    state: string
    url: string
    title: string
    created_at: string
    updated_at: string
    closed_at: string
    merged_at: string
}

export type GithubApiIssueResponse = {
    id: number
    number: number
    user: GithubUser
    assignee: string
    state: string
    url: string
    title: string
    labels: Label[]
    created_at: string
    updated_at: string
    closed_at: string
    pull_request: object
}

export type GithubUser = {
    login: string
}

export class Label {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}
