import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // const dispatch = useDispatch<AppDispatch>()



    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);



    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const res = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: "http://localhost:3000",

                // // // hash rouer ---->
                return_url: `${import.meta.env.VITE_FRONTEND_URL}${import.meta.env.VITE_HASH_ROUTER}order-confirm`,
                // return_url: `if_required`,
            },
        });


        console.log(res)

        const { error } = res 


        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error?.message || "Error");
        } else {
            setMessage("An unexpected error occurred.");
        }





        setIsLoading(false);
    };



    // type PaymentElementOptions ={
    //     layout: string
    // }


    // const paymentElementOptions : PaymentElementOptions = {
    //     layout: "tabs"
    // }

    return (

        <div style={{width : "99vw" , height : "99vh"}} className=" flex justify-center items-center" id="stripe">

            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>

        </div>

    );
}



