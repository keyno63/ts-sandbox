import {IssueController} from "./github/api/application/controller/IssueController";
import {GithubRepositoryImpl} from "./github/api/infrastructure/repository/GithubRepositoryImpl";
import {IssueServiceImpl} from "./github/api/usecase/service/IssueServiceImpl";
import {SlackApiSender} from "./github/api/application/presentation/SlackApiSender";
import {Config} from "./config/Config";
import {PRController} from "./github/api/application/controller/PRController";
import {Console} from "./github/api/application/presentation/Console";


const target: { [key: string]: string[] } = {
    //keyno63: ["ts-sandbox", "go-mod-sandbox"],
    ghostdogpr: ["caliban"],
}
const conf = new Config(target, 10)


const cons = new Console()
const repository = new GithubRepositoryImpl("https://api.github.com/repos")

const service = new IssueServiceImpl(repository)
const control = new IssueController(service, cons, conf)

control.getIssues()

const control1 = new PRController(service, cons, conf)
control1.getPulls()
