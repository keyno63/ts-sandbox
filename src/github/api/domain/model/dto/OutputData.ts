export interface OutputData {}

export class IssueOutputData implements OutputData {
    issues: Issue[]
    constructor(issues: Issue[]) {
        this.issues = issues;
    }
}

export class Issue {
    repository: string

    number: number
    title: string
    labels: string[]
    closed: number

    constructor(repository: string, number: number, title: string, labels: string[], closed: number) {
        this.repository = repository;
        this.number = number;
        this.title = title;
        this.labels = labels;
        this.closed = closed;
    }
}

export class PullsOutputData implements OutputData　{
    pulls: Pulls[]
    constructor(pulls: Pulls[]) {
        this.pulls = pulls;
    }
}

export class Pulls {
    repository: string

    number: number
    author: string
    title: string
    closed: number

    constructor(repository: string, number: number, author: string, title: string, closed: number) {
        this.repository = repository;
        this.number = number;
        this.author = author;
        this.title = title;
        this.closed = closed;
    }
}
