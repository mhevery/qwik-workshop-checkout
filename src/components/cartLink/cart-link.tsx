import CartSvg from "~/components/icons/cart";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import indexCSS from "./cart-link.css?inline";

export const CartLink = component$(() => {
    useStylesScoped$(indexCSS);
    return (
        <a class="goToCart" href="/cart">
            <CartSvg />
            <div>Go to cart</div>
        </a>
    );
});
