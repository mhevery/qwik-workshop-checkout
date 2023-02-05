import {component$, useSignal, useStylesScoped$} from "@builder.io/qwik";
import {type DocumentHead, loader$} from "@builder.io/qwik-city";
import { type Product, products } from "~/data/productsDB";
import { ProductCmp } from "~/components/product/product";
import indexCSS from "./index.css?inline";
import CartSvg from '../components/icons/cart';
import {CartItem, getCartItemsFromCookie} from "~/routes/cart";

export const productsLoader = loader$(() => {
  return products;
});

export const cartQuantityLoader = loader$(({ cookie }) => {
    const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
    return cartItems.reduce(
        (sum, item) => sum + item.qty,
        0
    );
});

export default component$(() => {
    useStylesScoped$(indexCSS);
  const filterSignal = useSignal("");
  const productsSignal = productsLoader.use();
  const cartQuantitySiganl = cartQuantityLoader.use();
  return (
    <div>
        <section>
            <input
                placeholder="Search"
                value={filterSignal.value}
                onInput$={(e) =>
                    (filterSignal.value = (e.target as HTMLInputElement).value)
                }
            />
            <div class="cart">
                {`Your cart has ${cartQuantitySiganl.value} items`}
                <button class="goToCart" onClick$={() => { location.href = "/cart"; }}><CartSvg /><div>Go to cart</div></button>
            </div>
        </section>
      <ul>
        {productsSignal.value.filter(predicate).map((product) => (
          <li>
            <ProductCmp product={product} displayLink={true} />
          </li>
        ))}
      </ul>
    </div>
  );

  function predicate(product: Product) {
    if (filterSignal.value == "") return true;
    return product.name
      .toLowerCase()
      .includes(filterSignal.value.toLowerCase());
  }
});

export const head: DocumentHead = {
  title: "Welcome to Qwik Workshop Checkout Example",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

