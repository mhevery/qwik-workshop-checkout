import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { PlusMinus } from "~/components/plusMinus/plusMinus";
import { type ResolvedCartItem } from "~/routes/cart";
import { currencyFormat } from "~/routes/utils";
import indexCSS from "./cartItem.css?inline";

export const CartItemCmp = component$<{ item: ResolvedCartItem }>(
  ({ item }) => {
    useStylesScoped$(indexCSS);
    return (
      <div class="cartItem">
        <h2>
          <img src={item.product.image} />
          {item.product.name}
        </h2>
        <h3>{item.product.description}</h3>
        <div class="qty">
          <PlusMinus qty={item.qty} id={item.productId} />
        </div>
        <div class="">
          {item.product.name}
          <div class="description">{item.product.description} </div>
        </div>
        <div class="price">{currencyFormat(item.product.price)}</div>
      </div>
    );
  }
);
