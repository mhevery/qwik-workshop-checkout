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
      <tr class="cartItem">
        <td width="65">
          <img src={item.product.image} alt={`${item.product.name} image`}/>
        </td>
        <td width="342" class="cart-full-text">{item.product.name}</td>
        <td width="325">
          <a href={`/product/${item.productId}`}>Details</a>
        </td>
        <td width="120" class="cart-full-text">{currencyFormat(item.product.price)}</td>
        <td width="120">
          <PlusMinus
              qty={item.qty}
              id={item.productId}
              updateAction={updateAction}
          />
        </td>
      </tr>
  );
});
