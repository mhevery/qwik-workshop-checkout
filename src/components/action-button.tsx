import type { JSXChildren } from "@builder.io/qwik";
import { type ActionStore, Form } from "@builder.io/qwik-city";

export const ActionButton = ({
  action,
  children,
  params,
}: {
  action: ActionStore<any, any>;
  children: JSXChildren;
  params?: Record<string, any>;
}) => {
  return (
    <Form action={action}>
      {params &&
        Object.keys(params).map((key) => (
          <input type="hidden" name={key} value={params[key]} />
        ))}
      <button>{children}</button>
    </Form>
  );
};
