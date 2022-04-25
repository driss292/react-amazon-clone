import React from "react";
import CurrencyFormat from "react-currency-format";
import "./scss/_Subtotal.scss";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

export default function Subtotal() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const total = getBasketTotal(basket);
  const handleToken = async (token) => {
    const response = await axios.post("http://localhost:8080/checkout", {
      token,
      total,
    });
    const { status } = response.data;
    if (status === " succes") {
      toast("Success ! Product purchased", {
        tupe: "success",
      });
    } else {
      toast("Error ! Something went wrong", {
        type: "error",
      });
    }
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal_left">
              <input type="checkbox" />
              This order constains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />

      {/* <button>Pay by card</button> */}
      <StripeCheckout
        stripeKey="pk_test_51KTROODZJ3ZAf9MXOQqnnpydlhMt8jNwMDHJlKWyRuPKt33IOQdyZzJSmqs5CTXDP9r0PsT91H0N9QYVGG7qzYMv00lqUDhKja"
        token={handleToken}
        amount={total}
      />
    </div>
  );
}
