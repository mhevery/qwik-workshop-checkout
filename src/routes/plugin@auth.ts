import type { Provider } from '@auth/core/providers';
import CredentialsProvider from '@auth/core/providers/credentials';
// import GitHub from '@auth/core/providers/github';
import { serverAuth$ } from '@builder.io/qwik-auth';
import { users } from '~/data/usersDB';

export const { useAuthSignup, useAuthSignout, useAuthSession } = serverAuth$(
    ({ env }) => ({
        secret: env.get('AUTH_SECRET'),
        trustHost: true,
        providers: [
            // GitHub({
            //     clientId: env.get('AUTH0_CLIENT_ID') as string,
            //     clientSecret: env.get('AUTH0_CLIENT_SECRET') as string,
            // }),
            CredentialsProvider({
                name: 'credentials',
                authorize: (credentials) => {
                    console.log('credentials', credentials)
                    if (credentials) {
                        const user = users.get(credentials.username as string);
                        if (user) {
                            if (user.password === credentials.password) {
                                return { id: user.username, name: user.username, email: `${user.username}@gmail.com`};
                            }
                        }
                    }
                    return null;
                }
            }),
        ] as Provider[],
    }));

