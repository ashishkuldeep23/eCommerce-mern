import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./stripe.css";
import { orderState } from "../../Slices/OrderSlice";
import { toast } from "sonner";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripeKey = `${import.meta.env.VITE_STRIPE_KEY}`;

const stripePromise = loadStripe(stripeKey);

export default function StripePaymetMain() {
   const [clientSecret, setClientSecret] = useState("");

   const cartData = orderState().orderArr.cartData;

   useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      const now = new Date();

      let clientSecretInLocal = localStorage.getItem(
         "clientSecretInLocal",
      ) as any;
      if (clientSecretInLocal) {
         clientSecretInLocal = JSON.parse(clientSecretInLocal);

         //  console.log({ clientSecretInLocal });
         //  console.log(now.getTime() > clientSecretInLocal?.expiry);

         if (
            clientSecretInLocal.key &&
            now.getTime() > clientSecretInLocal?.expiry
         ) {
            setClientSecret(clientSecretInLocal.key);
            // console.log("OSM");
            return;
         }
      }

      let calculatePrice = cartData.reduce((sum, items) => {
         return sum + items.price * items.quantity;
      }, 0);

      localStorage.removeItem("clientSecretInLocal");

      fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ totalPrice: calculatePrice }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (!data?.status) {
               toast.error("Getting error during payment.");
               console.log({ data });
               return;
            }

            localStorage.setItem(
               "clientSecretInLocal",
               JSON.stringify({
                  key: data.clientSecret,
                  expiry: now.getTime() + 2 * 60 * 1000,
               }),
            );
            setClientSecret(data.clientSecret);
         });
   }, []);

   // const appearance = {
   //     theme: 'stripe',
   // };
   // const options = {
   //     clientSecret,
   //     appearance,
   // };

   return (
      <div className="App">
         {clientSecret && (
            <Elements
               options={{ clientSecret, appearance: { theme: "night" } }}
               stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
      </div>
   );
}
