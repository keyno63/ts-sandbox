import {getIssueData, getPRData} from "./request";

function hello(name: string): string {
    return `Hello, ${name}!`;
}

console.log(hello("TypeScript"));

const dt = new Date()
dt.setDate(dt.getDate() - 7)

// 一週間以内に終了した  一覧をとる
getPRData(20)
    .then(issues => {
        const ret = issues
            .filter(issue => issue.state === "closed" && issue.closed_at > dt.getTime())

        console.log("closed recent prs.")
        console.log(ret)
    })

// 一週間以内に終了した Issue 一覧をとる
getIssueData(20)
    .then(issues => {
        const ret = issues
            .filter(issue => issue.state === "closed" && issue.closed_at > dt.getTime())

        console.log("closed recent issues.")
        console.log(ret)
    })

