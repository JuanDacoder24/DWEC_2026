import { INinja } from "./ininja";

export interface INinjaResponse {
    content: INinja[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
}