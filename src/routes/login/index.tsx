import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import indexCSS from "./index.css?inline";
import { useAuthSignin } from "~/routes/plugin@auth";

export default component$(() => {
  const loginAction = useAuthSignin();
  const location = useLocation();
  useStylesScoped$(indexCSS);

  return (
      <Form action={loginAction}>
        <div class="container">
          <input
              type="hidden"
              name="callbackUrl"
              value={new URL(location.url).searchParams.get("redirect")}
          />
          <input
              type="hidden"
              name="provider"
              value="credentials"
          />

          <div class="login">
            <button>Login</button>
          </div>
        </div>
      </Form>
  );
});
