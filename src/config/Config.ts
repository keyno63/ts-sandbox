export class Config {
    readonly target:  { [key: string]: string[] }
    readonly pageNum: number

    constructor(target: { [p: string]: string[] }, pageNum: number) {
        this.target = target;
        this.pageNum = pageNum;
    }
}