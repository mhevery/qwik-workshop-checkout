import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { PlusMinus } from "~/components/plusMinus/plus-minus";
import { type ResolvedCartItem, updateCountAction } from "~/routes/cart";
import { currencyFormat } from "~/routes/utils";
import indexCSS from "./cartItem.css?inline";

interface CartItemCmpProps {
  item: ResolvedCartItem;
}

export const CartItemCmp = component$(({ item }: CartItemCmpProps) => {
  useStylesScoped$(indexCSS);
  const updateAction = updateCountAction.use();
  return (
    <div class="cartItem">
      <div className="container">
        <img src={item.product.image} alt={`${item.product.name} image`} />
        <h2>{item.product.name}</h2>
        <h3>{item.product.description}</h3>
        <div class="qty">
          <PlusMinus
            qty={item.qty}
            id={item.productId}
            updateAction={updateAction}
          />
        </div>
        <div class="">
          {item.product.name}
          <div class="description">{item.product.description} </div>
        </div>
        <div class="price">{currencyFormat(item.product.price)}</div>
      </div>
    </div>
  );
});
