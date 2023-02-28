import { component$, Slot } from "@builder.io/qwik";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import { useAuthSession } from "~/routes/plugin@auth";

export default component$(() => {
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
