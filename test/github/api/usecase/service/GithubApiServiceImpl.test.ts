import {GithubApiServiceImpl} from "../../../../../src/github/api/usecase/service/GithubApiServiceImpl";
import {GithubRepository} from "../../../../../src/github/api/domain/repository/GithubRepository";
import {GithubApiPRData, GithubApiIssueData} from "../../../../../src/github/api/domain/model/entity/GithubApiData";
import {
    Issue,
    IssueOutputData,
    Pulls,
    PullsOutputData
} from "../../../../../src/github/api/domain/model/dto/OutputData";

jest.mock("../../../../../src/github/api/domain/repository/GithubRepository")
const RepositoryMock = jest.fn<GithubRepository, []>()
    .mockImplementation(() => {
        return {
            getPulls: async () => {
                return [
                    new GithubApiPRData(
                        1,
                        10,
                        "sample_user",
                        "closed",
                        "http://sample.com",
                        "title1",
                        1000,
                        1000,
                        1628985600000,
                        2000
                    )
                ]
            },
            getIssues: async () => {
                return [
                    new GithubApiIssueData(
                        1,
                        10,
                        "sample_user",
                        "assignee",
                        "closed",
                        "http://sample.com",
                        "title1",
                        [],
                        1000,
                        1000,
                        1628985600000
                    )
                ]
            }
        }
    })
const service = new GithubApiServiceImpl(new RepositoryMock())

describe("service のテスト", () => {
    test("issue 取得のテスト", () => {
        const expected = new IssueOutputData(
            [
                new Issue(
                    "",
                    10,
                    "title1",
                    [],
                    1628985600000
                )
            ]
        )
        return service.getIssues([""], 1, 10)
            .then(
            actual => expect(actual).toStrictEqual(expected)
        )
    })
    test("pull 取得のテスト", () => {
        const expected = new PullsOutputData(
            [
                new Pulls(
                    "",
                    10,
                    "sample_user",
                    "title1",
                    1628985600000
                )
            ]
        )
        return service.getPulls([""], 1, 10)
            .then(
                actual => expect(actual).toStrictEqual(expected)
            )
    })
    // filtered されたテストを後から追記する
})