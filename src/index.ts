import {IssueController} from "./github/api/application/controller/IssueController";
import {GithubRepositoryImpl} from "./github/api/infrastructure/repository/GithubRepositoryImpl";
import {IssueServiceImpl} from "./github/api/usecase/service/IssueServiceImpl";
import {Viewer} from "./github/api/application/presentation/Viewer";
import {IssueOutputData, PullsOutputData} from "./github/api/domain/model/dto/OutputData";
import {SlackApiSender} from "./github/api/application/presentation/SlackApiSender";
import {Config} from "./config/Config";
import {PRController} from "./github/api/application/controller/PRController";

function hello(name: string): string {
    return `Hello, ${name}!`;
}

console.log(hello("TypeScript"));

class Console implements Viewer {
    public async exec(data: IssueOutputData) {
        const message: string = data.issues
            .map(issue => {
                const closedTime = new Date(issue.closed).toISOString();
                return `#${issue.number} "${issue.title}" ${closedTime}`
            }).join("\n")
        console.log(message)
    }
    public async execPulls(data: PullsOutputData) {
        const message: string = data.pulls
            .map(pull => {
                const closedTime = new Date(pull.closed).toISOString();
                return `#${pull.number} "${pull.title}" ${closedTime}`
            }).join("\n")
        console.log(message)
    }
}

const target: { [key: string]: string[] } = {
    keyno63: ["ts-sandbox", "go-mod-sandbox"],
}
const conf = new Config(target, 10)


const cons = new Console()
const repository = new GithubRepositoryImpl("https://api.github.com/repos")

const service = new IssueServiceImpl(repository)
const control = new IssueController(service, cons, conf)

control.getIssues()

const control1 = new PRController(service, cons, conf)
control1.getPulls()
