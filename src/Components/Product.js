import React from "react";
import "./scss/_Product.scss";

export default function Product({ id, title, price, rating, image }) {
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <small>€</small>
        <strong className="product_price">{price}</strong>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐️</p>
            ))}
        </div>
        <img src={image} alt="product" />
        <button>Add to Basket</button>
      </div>
    </div>
  );
}
