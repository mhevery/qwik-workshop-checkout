import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/header/header';
import { RequestHandler } from "@builder.io/qwik-city";
import { getAuthenticationFromCookie } from "~/services/authenticationService";
import Footer from "~/components/footer/footer";

export const onGet: RequestHandler = async ({ redirect, cookie }) => {
    const user = getAuthenticationFromCookie(cookie);
    if (!user) {
        throw redirect(302,'/login');
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
      <Footer />
    </>
  );
});
