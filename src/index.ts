import {IssueController} from "./github/api/application/controller/IssueController";
import {PRController} from "./github/api/application/controller/PRController";
import container from "./Conatiner";

const issueController: IssueController = container.resolve("issueController")
const pullsController: PRController = container.resolve("pullsController")

issueController.getIssues()
pullsController.getPulls()
