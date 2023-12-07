import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./stripe.css";
import { orderState } from "../../Slices/OrderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripeKey = 'pk_test_51OJqyYSBfy1BwBmQEoYyid4t50zL5WKMb588vYhhnB9yoDTmL0AM0EOUGf1asbhLxOSyLY0v2jS6ReTHcbxtWOeO00n11CtE6h'

const stripePromise = loadStripe(stripeKey);

export default function StripePaymetMain() {
    const [clientSecret, setClientSecret] = useState("");

    const cartData = orderState().orderArr.cartData

 

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads


        let calculatePrice = cartData.reduce((sum, items) => { return sum + (items.price * items.quantity) }, 0)



        fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalPrice : calculatePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
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
                <Elements options={{ clientSecret, appearance: { theme:"night" } }} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}