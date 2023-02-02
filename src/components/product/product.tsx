import {component$, useStylesScoped$} from "@builder.io/qwik";
import {Product} from "~/data/productsDB";
import productCSS from "./product.css?inline";
import {addToCartAction} from "~/routes/cart";
import {currencyFormat} from "~/routes/utils";
import {Form} from "@builder.io/qwik-city";

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