import {
    Issue,
    IssueOutputData,
    Pulls,
    PullsOutputData
} from "@src/github/api/domain/model/dto/OutputData";
import {GithubApiService} from "@src/github/api/domain/service/GithubApiService";
import {IssueController} from "@src/github/api/application/controller/IssueController";
import {Viewer} from "@src/github/api/application/presentation/Viewer";
import {IConfig} from "config";

const ServiceMock = jest.fn<GithubApiService, []>()
    .mockImplementation(() => {
        return {
            getPulls: async () => {
                return new PullsOutputData(
                    [
                        new Pulls(
                            "reponame",
                            100,
                            "user1",
                            "title1",
                            1628985600000
                        )
                    ]
                )
            },
            getIssues: async () => {
                return new IssueOutputData(
                    [
                        new Issue(
                            "reponame",
                            100,
                            "title1",
                            [],
                            1628985600000
                        )
                    ]
                )
            }
        }
    })

const ViewMock = jest.fn<Viewer, []>()
    .mockImplementation(() => {
        return {
            exec:() => {},
            execPulls: () => {}
        }
    })

// const configMock = jest.fn<IConfig, []>()
//     .mockImplementationOnce(() => {
//         return {
//             get:() => {
//                 return {"org1": ["repo1", "repo2"]}
//             },
//             has: () => {
//                 return true
//             }
//             util
//         }
//     })
//     .mockImplementationOnce()

// const spy = jest.spyOn(c, "get");
// spy.mockImplementationOnce(() => {return {"org1": ["repo1", "repo2"]}})
//     .mockImplementationOnce(() => {return 1})
//     .mockImplementationOnce(() => {return 1})

const configMock: IConfig = {
    get: jest.fn()
        .mockImplementationOnce(() => {return {"org1": ["repo1", "repo2"]}})
        .mockImplementationOnce(() => {return 1})
        .mockImplementationOnce(() => {return 1}),
    has: jest.fn(),
    util: {
        extendDeep: jest.fn(),
        cloneDeep: jest.fn(),
        equalsDeep: jest.fn(),
        diffDeep: jest.fn(),
        makeImmutable: jest.fn(),
        makeHidden: jest.fn(),
        getEnv: jest.fn(),
        loadFileConfigs: jest.fn(),
        getConfigSources: jest.fn(),
        toObject: jest.fn(),
        setModuleDefaults: jest.fn(),
    },
}

jest.mock("../../../../../src/github/api/domain/service/GithubApiService")

// const RobotMock = GithubApiService.prototype as jest.Mock;

const mockGithubApiService = {
    getPulls: jest.fn(),
    getIssues: jest.fn()
}
jest.mock("../../../../../src/github/api/domain/service/GithubApiService", () => {
    return {
        GithubApiService: jest.fn().mockImplementation(() => mockGithubApiService)
    }
})
const mMock = jest.fn()
mMock.mockImplementationOnce(() => {
    return {
        getPulls: async () => {
            return new PullsOutputData(
                [
                    new Pulls(
                        "reponame",
                        100,
                        "user1",
                        "title1",
                        1628985600000
                    )
                ]
            )
        }
    }
})

const controller = new IssueController(mockGithubApiService, new ViewMock(), configMock)

describe("controller のテスト", () => {
    beforeEach(() => {
        jest.resetModules()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    test("getIssues のテスト", () => {
        mockGithubApiService.getPulls.mockImplementation(async () => {
            return new PullsOutputData(
                [
                    new Pulls(
                        "repoName",
                        100,
                        "user1",
                        "title1",
                        1628985600000
                    )
                ]
            )
        })
        mockGithubApiService.getIssues.mockImplementation(async () => {
            // TODO: impl
            return
        })
        return controller.getIssues()
            .then(
                _ => {
                    // expect(ServiceMock.mock.calls.length).toBe(1)
                    expect(mockGithubApiService.getIssues.mock.calls.length).toBe(1)
                }
            )

    })
})
