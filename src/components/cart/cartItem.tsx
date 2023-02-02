import {component$, useStylesScoped$, $} from "@builder.io/qwik";
import {currencyFormat} from "~/routes/utils";
import { ResolvedCartItem } from "~/routes/cart";
import { PlusMinus } from "~/components/plusMinus/plusMinus";
import indexCSS from "./cartItem.css?inline";

export const CartItemCmp = component$<{ item: ResolvedCartItem }>(
    ({ item }) => {
        useStylesScoped$(indexCSS);

        const handleQtyChange = $((newValue: number) => {
            item.qty = newValue;
            // TODO: update quantity on the cart
        });

        return (
            <div class="cartItem">
                <h2>
                    <img src={item.product.image} />
                    {item.product.name}
                </h2>
                <h3>{item.product.description}</h3>
                <div class="qty"><PlusMinus qty={item.qty} onChange$={handleQtyChange} /></div>

                <div class="">
                    {item.product.name}
                    <div class="description">{item.product.description} </div>
                </div>
                <div class="price">{currencyFormat(item.product.price)}</div>
            </div>
        );
    }
);