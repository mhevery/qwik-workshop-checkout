import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { action$, Form, loader$ } from "@builder.io/qwik-city";
import CSS from "./index.css?inline";

interface PaymentForm {
  cardHolderName: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

export const paymentLoader = loader$(() => {
  return {};
});

export const purchaseAction = action$(() => {});

export default component$(() => {
  useStylesScoped$(CSS);
  const purchase = purchaseAction.use();
  purchase.run(null as any);
  return (
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
        <label>Purchase</label>
        <button type="submit">Purchase</button>
      </div>
    </Form>
  );
});
