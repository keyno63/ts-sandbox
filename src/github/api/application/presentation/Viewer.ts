import {OutputData} from "../../domain/model/dto/OutputData";

export interface Viewer {
    exec(data: OutputData): void
}
