import React from "react";
import Header from "../Components/Header";
import CheckoutProduct from "../Components/CheckoutProduct";
import { useStateValue } from "../StateProvider";
import "./scss/_Checkout.scss";

export default function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="checkout_ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          <div>
            <h3>Hello, {user?.email}</h3>
            <h2 className="checkout_title">Your shopping basket</h2>
            {/* CHECKOUT PRODUCT */}
            {basket.map((item, i) => {
              return (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
