import type { JSXChildren } from "@builder.io/qwik";
import { type ActionStore, Form } from "@builder.io/qwik-city";

export const ActionLink = ({
  action,
  children,
}: {
  action: ActionStore<any, any>;
  children: JSXChildren;
}) => {
  return (
    <Form action={action}>
      <button class="link">{children}</button>
    </Form>
  );
};
