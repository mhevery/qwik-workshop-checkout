import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import indexCSS from "./index.css?inline";
// import { useLogin } from "~/services/authenticationService";
import { useAuthSignup } from "~/routes/plugin@auth";

export default component$(() => {
  //const loginAction = useLogin();
  const loginAction = useAuthSignup();
  const location = useLocation();
  useStylesScoped$(indexCSS);

  return (
      <Form action={loginAction}>
        <div class="container">
          <input
              type="hidden"
              name="redirectUrl"
              value={new URL(location.url).searchParams.get("redirect")}
          />
          <input
              type="hidden"
              name="provider"
              value="credentials"
          />
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
          />

          <div class="login">
            <button type="submit">Login</button>
          </div>
        </div>
      </Form>
  );
});
