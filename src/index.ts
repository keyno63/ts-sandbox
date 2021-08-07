import {createApiData} from "./request";

function hello(name: string): string {
    return `Hello, ${name}!`;
}

console.log(hello("TypeScript"));

createApiData(3).then(v => console.log(v));