import { users, User } from '~/data/usersDB';
import { action$, Cookie } from '@builder.io/qwik-city';

export function getAuthenticationFromCookie(cookie: Cookie): User | undefined {
    return cookie.get("authUser")?.json() || undefined;
}

export const login = action$(({ username, password }, { redirect, cookie}) => {
    const user = users.get(username as string);
    if (user) {
        if (user.password === password) {
            updateAuthCookie(cookie, user);
            throw redirect(301, "/");
        }
    }
});

export const logout = action$(({}, { cookie}) => {
    updateAuthCookie(cookie, '');
});

export function updateAuthCookie(cookie: Cookie, user: User | string) {
    cookie.set("authUser", user);
}
