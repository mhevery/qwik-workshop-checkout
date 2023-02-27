import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { getAuthenticationFromCookie } from "~/routes/plugin@auth";

export const onGet: RequestHandler = async ({ redirect, request, cookie }) => {
  const userAuth = getAuthenticationFromCookie(cookie);
  if (!userAuth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.url);
    throw redirect(302, loginUrl.toString());
  }
};

export default component$(() => {
  return <Slot />;
});
