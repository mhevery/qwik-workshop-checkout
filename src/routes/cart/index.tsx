import { component$, useStylesScoped$ } from "@builder.io/qwik";
import {
  action$,
  loader$,
  zod$,
  type Cookie,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { CartItemCmp } from "~/components/cart/cartItem";
import { products, type Product } from "~/data/productsDB";
import { currencyFormat } from "../utils";
import indexCSS from "./index.css?inline";
import { Payment } from "./payment";
export { paymentLoader } from "./payment";

export interface CartItem {
  productId: string;
  qty: number;
}

export interface ResolvedCartItem extends CartItem {
  product: Product;
}

export const addToCartAction = action$(
  ({ id }, { redirect, cookie }) => {
    console.log("Add to cart", id);
    const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
    const existingItem = cartItems.find((item) => item.productId === id);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cartItems.push({ productId: id, qty: 1 });
    }
    updateCartItemsCookie(cookie, cartItems);
    throw redirect(302, "/cart/");
  },
  zod$({
    id: z.string(),
  })
);

export function updateCartItemsCookie(cookie: Cookie, cartItems: CartItem[]) {
  cookie.set("cart", cartItems);
}

export const cartLoader = loader$(({ cookie }) => {
  const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
  console.log("cartItems", cartItems);
  return cartItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId)!,
  }));
});

export function getCartItemsFromCookie(cookie: Cookie): CartItem[] {
  return cookie.get("cart")?.json() || [];
}

export default component$(() => {
  useStylesScoped$(indexCSS);
  const cartSignal = cartLoader.use();
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartSignal.value.map((item) => (
          <li>
            <CartItemCmp item={item} />
          </li>
        ))}
      </ul>
      <div>
        <div class="total">
          {currencyFormat(
            cartSignal.value.reduce(
              (sum, item) => sum + item.qty * item.product.price,
              0
            )
          )}
        </div>
      </div>
      <Payment />
    </div>
  );
});

export const head: DocumentHead = ({ getData }) => {
  return {
    title: "Your cart has " + getData(cartLoader).length + " items",
    meta: [
      {
        name: "description",
        content: "Qwik site description",
      },
    ],
  };
};
