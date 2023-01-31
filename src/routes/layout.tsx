import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import {RequestHandler} from "@builder.io/qwik-city";
import {getAuthenticationFromCookie} from "~/services/authenticationService";

export const onGet: RequestHandler = async ({ redirect, cookie }) => {
    const user = getAuthenticationFromCookie(cookie);
    if (!user) {
        throw redirect(301,'/login', );
    }
};

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
