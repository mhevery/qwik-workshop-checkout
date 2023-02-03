export interface User {
  username: string;
  password: string;
}

export const users = new Map([
  [
    "misko",
    {
      username: "misko",
      password: "misko",
    },
  ],
  [
    "gilfi",
    {
      username: "gilfi",
      password: "654321",
    },
  ],
]);
