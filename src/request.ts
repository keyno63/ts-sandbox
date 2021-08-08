import axios, {AxiosResponse} from "axios";

class GithubApiData {
    animalType: string;
    constructor(animalType: string = "Yamamoto") {
        this.animalType = animalType;
    }

    isMiyamoto(): string {
        if (this.animalType === "Miyamoto") {
            return "is Miyamoto";
        }
        return "not Miyamoto";
    }
}

function call() {
    const v : GithubApiData = new GithubApiData();
    console.log(v.isMiyamoto());

    const v1 : GithubApiData = new GithubApiData("Miyamoto");
    console.log(v1.isMiyamoto());
}

const targetBaseUrl = "https://api.github.com/repos"
const apiClient = axios.create({
    baseURL: targetBaseUrl,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

function dateParseChallenge(key: string, val: any) {
    if (typeof val === "string") {
        const time = Date.parse(val);
        if (!Number.isNaN(time)) {
            return new Date(time);
        }
    }
    return val;
}

type GithubApiData2 = {
    id: number
    user: GithubUser
    state: string
    url: string
    title: string
    created_at: string
    updated_at: string
    closed_at: string
    merged_at: string
}

class GithubApiPRData {
    id: number
    user: string
    state: string
    url: string
    title: string
    created_at: number
    updated_at: number
    closed_at: number
    merged_at: number

    constructor(id: number, user: string, state:string, url: string, title: string, created_at: number, updated_at: number, closed_at: number, merged_at: number) {
        this.id = id;
        this.user = user;
        this.state = state;
        this.url = url;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.closed_at = closed_at;
        this.merged_at = merged_at;
    }
}

type GithubUser = {
    login: string
}

enum State {
    Closed = 'closed',
    Open = 'open',
    Other = ''
}

// method
export const createApiData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await apiClient.get<Array<GithubApiData2>>('/ghostdogpr/caliban/pulls', {
        params: {
            per_page: pageNum,
            state: "closed"
        }
    });

    return change(response.data)
}

const change = (data: Array<GithubApiData2>) => {
    return data.map(pr => {
        return new GithubApiPRData(
            pr.id,
            pr.state,
            pr.user.login,
            pr.url,
            pr.title,
            convertToTime(pr.created_at),
            convertToTime(pr.updated_at),
            convertToTime(pr.closed_at),
            convertToTime(pr.merged_at)
        )
    })
}

const convertToTime = (value: string) => {
    return new Date(value).getTime()
}
