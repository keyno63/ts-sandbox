import {IssueController} from "./github/api/application/controller/IssueController";
import {PullsController} from "./github/api/application/controller/PullsController";
import container from "./Conatiner";

const issueController: IssueController = container.resolve("issueController")
const pullsController: PullsController = container.resolve("pullsController")

const issues = issueController.getIssues()
const pulls = pullsController.getPulls()
Promise.all([issues, pulls])
    .then(_ => console.log("finished to do app"))
