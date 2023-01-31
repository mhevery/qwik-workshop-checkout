import {component$, useClientEffect$, useSignal, useStylesScoped$} from "@builder.io/qwik";
import { type DocumentHead, loader$, Form } from "@builder.io/qwik-city";
import { type Product, products } from "~/data/productsDB";
import indexCSS from "./index.css?inline";
import productCSS from "./product.css?inline";
import { addToCartAction } from "./cart";
import { currencyFormat } from "./utils";
import { getAuthenticationFromCookie } from "~/services/authenticationService";

export const productsLoader = loader$(() => {
  return products;
});

export const authenticationLoader = loader$(({ cookie }) => {
    return getAuthenticationFromCookie(cookie);
});

export default component$(() => {
    const authLoaderSignal = authenticationLoader.use();

    useClientEffect$(() => {
        if (!authLoaderSignal.value) {
            location.href = '/login';
        }
    });

  const filterSignal = useSignal("");
  useStylesScoped$(indexCSS);
  const productsSignal = productsLoader.use();
  return (
    <div>
      <div class="cart">
        [ <a href="/cart/">cart</a> ]
      </div>
      <input
        placeholder="Search"
        value={filterSignal.value}
        onInput$={(e) =>
          (filterSignal.value = (e.target as HTMLInputElement).value)
        }
      />
      <ul>
        {productsSignal.value.filter(predicate).map((product) => (
          <li>
            <ProductCmp product={product} />
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

export const ProductCmp = component$<{ product: Product }>(({ product }) => {
  useStylesScoped$(productCSS);
  const addToCart = addToCartAction.use();
  return (
    <div>
      <h2>
        <img src={product.image} />
        {product.name} ({currencyFormat(product.price)})
      </h2>
      <h3>{product.description}</h3>
      <Form action={addToCart}>
        <input type="hidden" name="id" value={product.id} />
        <button type="submit">Buy</button>
      </Form>
    </div>
  );
});
