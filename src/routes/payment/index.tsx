import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { action$, Form, loader$ } from "@builder.io/qwik-city";
import CSS from "./index.css?inline";
import { currencyFormat } from "~/routes/utils";
import { CartItem, getCartItemsFromCookie } from "~/routes/cart";
import { products } from "~/data/productsDB";

interface PaymentForm {
  cardHolderName: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

export const cartPriceLoader = loader$(({ cookie }) => {
  const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
  return currencyFormat(
      cartItems.reduce(
          (sum, item) => {
            const priceFound =  products.find((product) => product.id === item.productId);
            if (priceFound) {
              return sum + item.qty * priceFound.price;
            }
            return sum;
          },
          0
      )
  );
});

export const paymentLoader = loader$(() => {
  return {};
});

export const purchaseAction = action$(() => {});

export default component$(() => {
  useStylesScoped$(CSS);
  const cartPriceSignal = cartPriceLoader.use();
  const purchase = purchaseAction.use();
  return (
      <>
        <div>Payment total: {cartPriceSignal.value}</div>
        <Form action={purchase}>
          <div class="cardHolderName">
            <label>Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              placeholder="Card Holder Name"
            />
          </div>
          <div class="cardNumber">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Credit Card Number"
              maxLength={16}
            />
          </div>
          <div class="expiration">
            <label>Expiration MM/YY</label>
            <input type="text" name="cardNumber" placeholder="MM/YY" />
          </div>
          <div class="cvc">
            <label>CVC</label>
            <input type="text" name="cvc" placeholder="CVC" pattern="" />
          </div>
          <div class="purchase">
            <button type="submit">Purchase</button>
          </div>
        </Form>
      </>
  );
});
