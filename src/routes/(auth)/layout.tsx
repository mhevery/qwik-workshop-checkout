import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { getAuthenticationFromCookie } from "~/services/authenticationService";

export const onGet: RequestHandler = async ({ redirect, request, cookie }) => {
  const user = getAuthenticationFromCookie(cookie);
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.url);
    throw redirect(302, loginUrl.toString());
  }
};

export default component$(() => {
  return <Slot />;
});
