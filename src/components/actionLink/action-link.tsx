import type { JSXChildren } from "@builder.io/qwik";
import { type ActionStore, Form } from "@builder.io/qwik-city";

interface ActionLinkProps {
  action: ActionStore<any, any>;
  children: JSXChildren;
}

export const ActionLink = ({ action, children }: ActionLinkProps) => {
  return (
    <Form action={action}>
      <button class="link">{children}</button>
    </Form>
  );
};
