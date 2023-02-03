import {component$, useStylesScoped$} from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import indexCSS from "./index.css?inline";
import { login } from "~/services/authenticationService";

export default component$(() => {
    const loginAction = login.use();
    useStylesScoped$(indexCSS);

    return (
      <Form action={loginAction}>
          <div class="container">
              <label htmlFor="username"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="username" required />

              <label htmlFor="password"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="password" required />

              <div class="login">
                <button type="submit">Login</button>
              </div>
          </div>
      </Form>
    );
});
