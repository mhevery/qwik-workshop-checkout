import type { Provider } from '@auth/core/providers';
import CredentialsProvider from '@auth/core/providers/credentials';
import { serverAuth$ } from '@builder.io/qwik-auth';
import { users } from '~/data/usersDB';
import { type Cookie } from "@builder.io/qwik-city";

export function getAuthenticationFromCookie(cookie: Cookie): string | undefined {
    const authCookie = cookie.get("next-auth.session-token");
    return authCookie?.value || undefined;
}

export const { useAuthSignup, useAuthSignout, useAuthSession, onRequest } = serverAuth$(
    ({ env }) => {
        return ({
            secret: import.meta.env.VITE_AUTH_SECRET,
            trustHost: true,
            providers: [
                CredentialsProvider({
                    name: 'Email',
                    authorize: (credentials) => {
                        if (credentials) {
                            const user = users.get(credentials.username as string);
                            if (user) {
                                if (user.password === credentials.password) {
                                    return { id: user.username, name: user.username, email: `${user.username}@gmail.com`};
                                }
                            }
                        }
                        return null;
                    },
                    credentials: {
                        username: { label: 'Username', type: 'text' },
                        password: { label: 'Password', type: 'password' },
                    },
                }),
            ] as Provider[],
    })});

