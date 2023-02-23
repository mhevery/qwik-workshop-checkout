import { component$, Slot } from "@builder.io/qwik";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import {loader$} from "@builder.io/qwik-city";
import {getAuthenticationFromCookie} from "~/services/authenticationService";
import { useAuthSession } from "~/routes/plugin@auth";

// export const useUserLoader = loader$(({ cookie }) => {
//     return getAuthenticationFromCookie(cookie);
// });

export default component$(() => {
    //const userSignal = useUserLoader();
    const userSignal = useAuthSession();

    return (
        <>
            <main>
                <Header loggedIn={userSignal.value?.user !== undefined} />
                <section>
                    <Slot />
                </section>
            </main>
            <Footer />
        </>
    );
});
