export interface User {
    username: string;
    password: string;
}

export const users = new Map([
    ["miskohe", {
        username: "miskohe",
        password: "123456",
    }],
    ["gilfi", {
        username: "gilfi",
        password: "654321",
    }],
]);
