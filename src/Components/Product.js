import React from "react";
import "./scss/_Product.scss";
import { useStateValue } from "../StateProvider";

export default function Product({ id, title, price, rating, image }) {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    // Dispatch the item into the Data Layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };
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
        <button onClick={addToBasket}>Add to Basket</button>
      </div>
    </div>
  );
}
