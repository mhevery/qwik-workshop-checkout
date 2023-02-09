import {
  component$,
  Resource,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { loader$, useLocation, type DocumentHead } from "@builder.io/qwik-city";
import {
  getBuilderSearchParams,
  getContent,
  type RegisteredComponent,
  RenderContent,
} from "@builder.io/sdk-qwik";
import { ProductCmp } from "~/components/product/product";
import { products, type Product } from "~/data/productsDB";
import { getCartItemsFromCookie, type CartItem } from "~/routes/cart";
import CartSvg from "../components/icons/cart";
import indexCSS from "./index.css?inline";

export const BUILDER_PUBLIC_API_KEY = "26950364a825464593a7fc11c6bbda89"; // ggignore

export const productsLoader = loader$(() => {
  return products;
});

export const cartQuantityLoader = loader$(({ cookie }) => {
  const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
});

export default component$(() => {
  const location = useLocation();
  const builderContentRsrc = useResource$<any>(() => {
    return getContent({
      model: "hero",
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: {
        ...getBuilderSearchParams(location.query),
        cachebust: true,
      },
      userAttributes: {
        urlPath: location.pathname || "/",
      },
    });
  });

  useStylesScoped$(indexCSS);
  const filterSignal = useSignal("");
  const productsSignal = productsLoader.use();
  const cartQuantitySiganl = cartQuantityLoader.use();
  return (
    <div>
      <Resource
        value={builderContentRsrc}
        onPending={() => <div>Loading...</div>}
        onResolved={(content) => (
          <RenderContent
            model="page"
            content={content}
            apiKey={BUILDER_PUBLIC_API_KEY}
            // Optional: pass in a custom component registry
            customComponents={CUSTOM_COMPONENTS}
          />
        )}
      />
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
          <button
            class="goToCart"
            onClick$={() => {
              window.location.replace("/cart");
            }}
          >
            <CartSvg />
            <div>Go to cart</div>
          </button>
        </div>
      </section>
      <ul>
        {productsSignal.value.filter(predicate).map((product) => (
          <li>
            <ProductCmp
              product={product}
              displayLink={true}
              displayDescription={false}
            />
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

export const MyFunComponent = component$((props: { text: string }) => {
  const state = useStore({
    count: 0,
  });

  return (
    <div style="color: white;">
      <h3>{props.text.toUpperCase()}</h3>
      <p>{state.count}</p>
      <button onClick$={() => state.count++}>Click me</button>
    </div>
  );
});

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: MyFunComponent,
    name: "MyFunComponent",

    inputs: [
      {
        name: "text",
        type: "string",
        defaultValue: "Hello world",
      },
    ],
  },
];
