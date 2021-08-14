import {asClass, asValue, AwilixContainer, createContainer, InjectionMode} from "awilix";
import config from "config";
import {IssueController} from "./github/api/application/controller/IssueController";
import {PullsController} from "./github/api/application/controller/PullsController";
import {GithubApiServiceImpl} from "./github/api/usecase/service/GithubApiServiceImpl";
import {GithubRepositoryImpl} from "./github/api/infrastructure/repository/GithubRepositoryImpl";
import {Console} from "./github/api/application/presentation/Console";

const container: AwilixContainer = createContainer(
    {
        injectionMode: InjectionMode.CLASSIC
    }
)

container.register(
    {
        issueController: asClass(IssueController),
        pullsController: asClass(PullsController),
        service: asClass(GithubApiServiceImpl),
        repository: asClass(GithubRepositoryImpl),
        view: asClass(Console),
        config: asValue(config),
    }
)

export default container
