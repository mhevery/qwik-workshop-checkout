import {component$, useSignal, $, PropFunction, useStylesScoped$} from "@builder.io/qwik";
import indexCSS from "./plusMinus.css?inline";

interface PlusMinusProps {
   qty: number;
   onChange$: PropFunction<(qty: number) => void>;
}

export const PlusMinus = component$<PlusMinusProps>(({ qty, onChange$ }) => {
   useStylesScoped$(indexCSS);
   const qtySignal = useSignal(qty);

   const handleInc = $(() => {
      qtySignal.value++;
      if (onChange$) {
         onChange$(qtySignal.value);
      }
   });

   const handleDec = $(() => {
      if (qtySignal.value !== 0) {
         qtySignal.value--;
      }
      if (onChange$) {
         onChange$(qtySignal.value);
      }
   });

   return (
       <div>
          <button onClick$={handleInc}>+</button>
          <div>{qtySignal.value}</div>
          <button onClick$={handleDec}>-</button>
       </div>
   );
});