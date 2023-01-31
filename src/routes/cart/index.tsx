import { component$ } from "@builder.io/qwik";
import {
  action$,
  type DocumentHead,
  loader$,
  zod$,
  type Cookie,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { products, type Product } from "../productsDB";
import { currencyFormat } from "../utils";

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
  const cartSignal = cartLoader.use();
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartSignal.value.map((item) => (
          <li>
            <CartItemCmp item={item} />
          </li>
        ))}
      </div>
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
    </div>
  );
});

export const CartItemCmp = component$<{ item: ResolvedCartItem }>(
  ({ item }) => (
    <div class="cartItem">
      <div class="qty">({item.qty})</div>
      <div class="">
        {item.product.name}
        <div class="description">{item.product.description} </div>
      </div>
      <div class="price">{currencyFormat(item.product.price)}</div>
      <div class="total">{currencyFormat(item.product.price)}</div>
      <Payment />
    </div>
  )
);

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

export const Payment = component$(() => {
  return <div>Payment</div>;
});
