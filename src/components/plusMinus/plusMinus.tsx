import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { updateCountAction } from "~/routes/cart";
import { ActionButton } from "../action-button";
import indexCSS from "./plusMinus.css?inline";

interface PlusMinusProps {
  qty: number;
  id: string;
}

export const PlusMinus = component$<PlusMinusProps>(({ qty, id }) => {
  useStylesScoped$(indexCSS);
  const updateCount = updateCountAction.use();
  return (
    <div>
      <ActionButton action={updateCount} params={{ id: id, qtyChange: 1 }}>
        +
      </ActionButton>
      <div>{qty}</div>
      <ActionButton action={updateCount} params={{ id: id, qtyChange: -1 }}>
        -
      </ActionButton>
    </div>
  );
});
