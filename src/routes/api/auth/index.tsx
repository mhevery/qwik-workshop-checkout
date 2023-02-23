import type { RequestEvent } from "@builder.io/qwik-city";
import { onRequest } from "~/routes/plugin@auth";

export const onGet = (event: RequestEvent) => {
    return onRequest(event);
};

export const onPost = (event: RequestEvent) => {
    return onRequest(event);
};