import { component$, useOnDocument, useStore, $ } from "@builder.io/qwik";

export const OpenModel = component$(() => {
  const modal = useStore({ open: false });
  useOnDocument(
    "click",
    $(() => (modal.open = false))
  );
  return (
    <div>
      {modal.open ? (
        <Modal />
      ) : (
        <button onClick$={() => (modal.open = true)}>open</button>
      )}
    </div>
  );
});

export const Modal = component$(() => {
  return null;
});
