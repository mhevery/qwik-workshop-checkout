import {component$, useStylesScoped$} from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { products } from "~/data/productsDB";
import {ProductCmp} from "~/components/product/product";
import indexCSS from "./index.css?inline";
import CartSvg from "~/components/icons/cart";
import {CartLink} from "~/components/cartLink/cart-link";

export const useProductLoader = loader$(({ params }) => {
    return products.find((product) => product.id === params.id);
});

export default component$(() => {
    useStylesScoped$(indexCSS);
    const productSignal = useProductLoader();
    return (
        <div class="container">
            <section>
                <div class="cart">
                    <CartLink />
                </div>
            </section>
            <div class="productContainer">
                <ProductCmp product={productSignal.value} />
            </div>
        </div>
    );
});