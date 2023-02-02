import {component$, useSignal, useStylesScoped$} from "@builder.io/qwik";
import {type DocumentHead, loader$} from "@builder.io/qwik-city";
import { type Product, products } from "~/data/productsDB";
import { ProductCmp } from "~/components/product/product";
import indexCSS from "./index.css?inline";

export const productsLoader = loader$(() => {
  return products;
});

export default component$(() => {
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

