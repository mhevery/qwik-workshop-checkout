import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Product } from "~/data/productsDB";
import productCSS from "./product.css?inline";
import { addToCartAction } from "~/routes/cart";
import { currencyFormat } from "~/routes/utils";
import { Form } from "@builder.io/qwik-city";

interface ProductCmpProps {
    product: Product;
}

export const ProductCmp = component$(({ product }: ProductCmpProps) => {
    useStylesScoped$(productCSS);
    const addToCart = addToCartAction.use();
    return (
        <div class="card">
            <div class="container">
                <img alt={`${product.name} image`} src={product.image} />
                <h2>
                    {product.name} ({currencyFormat(product.price)})
                </h2>
                <p>{product.description}</p>
                <Form action={addToCart}>
                    <input type="hidden" name="id" value={product.id} />
                    <button type="submit">Add to cart</button>
                </Form>
            </div>
        </div>
    );
});