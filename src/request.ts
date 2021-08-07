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

    const v1 : GithubApiData = new GithubApiData("hoge");
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
    url: string
    title: string
    created_at: string
    updated_at: string
}

class GithubApiData3 {
    id: number
    url: string
    title: string
    created_at: string
    updated_at: string

    constructor(id: number, url: string, title: string, created_at: string, updated_at: string) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

// method
export const createApiData = async (pageNum: number = 1) => {
    const response: AxiosResponse = await apiClient.get<Array<GithubApiData2>>('/ghostdogpr/caliban/pulls', {
        params: { per_page: pageNum}
    });

    return change(response.data)
}

const change = (data: Array<GithubApiData2>) => {
    return data.map(pr => {
        return new GithubApiData3(
            pr.id,
            pr.url,
            pr.title,
            pr.created_at,
            pr.updated_at
        )
    })
}
