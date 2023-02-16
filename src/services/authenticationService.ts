import { users, type User } from "~/data/usersDB";
import { action$, type Cookie, zod$ } from "@builder.io/qwik-city";
import { updateCartItemsCookie } from "~/routes/cart";
import * as z from "zod";

export function getAuthenticationFromCookie(cookie: Cookie): User | undefined {
  const authCookie = cookie.get("authUser");
  return authCookie?.json() || undefined;
}

export const useLogin = action$(
  ({ username, password, redirectUrl }, { redirect, cookie }) => {
    const user = users.get(username as string);
    if (user) {
      if (user.password === password) {
        updateAuthCookie(cookie, user);
        throw redirect(308, redirectUrl);
      }
    }
  },
  zod$({
    username: z.string(),
    password: z.string(),
    redirectUrl: z.string(),
  })
);

export const useLogout = action$((_, { redirect, cookie }) => {
  updateAuthCookie(cookie, "");
  updateCartItemsCookie(cookie, []);
  throw redirect(308, "/");
});

export function updateAuthCookie(cookie: Cookie, user: User | string) {
  cookie.set("authUser", user, { secure: true, path: "/" });
}
