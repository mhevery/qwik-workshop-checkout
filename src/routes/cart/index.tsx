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
export { paymentLoader } from "../payment";

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

export const updateCountAction = action$(
  ({ id, qtyChange }, { cookie }) => {
    console.log("updateCountAction", id, qtyChange);
    let cartItems: CartItem[] = getCartItemsFromCookie(cookie);
    const existingItem = cartItems.find((item) => item.productId === id);
    if (existingItem) {
      existingItem.qty += qtyChange;
      if (existingItem.qty <= 0) {
        cartItems = cartItems.filter((item) => item.productId !== id);
      }
    }
    updateCartItemsCookie(cookie, cartItems);
  },
  zod$({
    id: z.string(),
    qtyChange: z.coerce.number(),
  })
);

export const cartLoader = loader$(({ cookie }) => {
  const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
  return cartItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId)!,
  }));
});

export function getCartItemsFromCookie(cookie: Cookie): CartItem[] {
  const headers = cookie.headers();
  const header = headers.find((header) => header.startsWith("cart="));
  let cartItems: CartItem[] = [];
  if (header) {
    cartItems = JSON.parse(
      decodeURIComponent(header.substring("cart=".length, header.indexOf(";")))
    );
  } else {
    cartItems = cookie.get("cart")?.json() || [];
  }
  console.log("HEADER GET", "cart", cartItems);
  return cartItems;
}

export function updateCartItemsCookie(cookie: Cookie, cartItems: CartItem[]) {
  console.log("COOKIE SET", "cart", cartItems);
  cookie.set("cart", cartItems, { path: "/" });
}

export default component$(() => {
  useStylesScoped$(indexCSS);
  const cartSignal = cartLoader.use();
  return (
    <div>
      <h1>Cart</h1>
      {JSON.stringify(cartSignal.value)}
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
          <button
            onClick$={() => {
              location.href = "/payment";
            }}
          >
            Checkout & Pay
          </button>
        </div>
      </div>
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
