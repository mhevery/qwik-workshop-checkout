import { users, User } from "~/data/usersDB";
import { action$, Cookie } from "@builder.io/qwik-city";

export function getAuthenticationFromCookie(cookie: Cookie): User | undefined {
  const authCookie = cookie.get("authUser");
  return authCookie?.json() || undefined;
}

export const login = action$(({ username, password }, { redirect, cookie }) => {
  const user = users.get(username as string);
  console.log("user", user);
  if (user) {
    if (user.password === password) {
      updateAuthCookie(cookie, user);
      throw redirect(308, "/");
    }
  }
});

export const logout = action$(({}, { redirect, cookie }) => {
  console.log("Logout");
  updateAuthCookie(cookie, "");
  throw redirect(308, "/login");
});

export function updateAuthCookie(cookie: Cookie, user: User | string) {
  cookie.set("authUser", user, { secure: true, path: "/" });
}
