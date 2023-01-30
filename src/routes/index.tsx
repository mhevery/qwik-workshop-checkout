import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { type DocumentHead, loader$ } from "@builder.io/qwik-city";
import { type Product, products } from "./productsDB";
import indexCSS from "./index.css?inline";
import productCSS from "./product.css?inline";

export const productsLoader = loader$(() => {
  return products;
});

export default component$(() => {
  useStylesScoped$(indexCSS);
  const productsSignal = productsLoader.use();
  return (
    <div>
      <ul>
        {productsSignal.value.map((product) => (
          <li>
            <ProductCmp product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
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
  return (
    <div>
      <h2>
        <img src={product.image} />
        {product.name} ({currencyFormat(product.price)})
      </h2>
      <h3>{product.description}</h3>
    </div>
  );
});

export function currencyFormat(value: number): string {
  return "$" + value.toFixed(2);
}
