import {asClass, asValue, AwilixContainer, createContainer, InjectionMode} from "awilix";
import config from "config";
import {IssueController} from "./github/api/application/controller/IssueController";
import {PRController} from "./github/api/application/controller/PRController";
import {IssueServiceImpl} from "./github/api/usecase/service/IssueServiceImpl";
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
        pullsController: asClass(PRController),
        service: asClass(IssueServiceImpl),
        repository: asClass(GithubRepositoryImpl),
        view: asClass(Console),
        config: asValue(config),
    }
)

export default container
