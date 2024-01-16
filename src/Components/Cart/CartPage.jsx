// CartPage.js
import React, { useEffect } from "react";
import { useCart } from "../../Contexts/CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    // Add logic for completing the purchase
    // You can redirect to a payment page or perform other actions here
    console.log("Purchase button clicked!");
  };

  return (
    <div className="main">

    <h2 className="cartH2">Cart</h2>
    <div className="cart-page">
      <div className="cartContainer">
        {cart.map((item) => (
          <div key={item.docId} className="cart-item">
            <div className="cart-details">
              <img className="item-image" src={item.image} alt="" />
              <h3>{item.name}</h3>
              <div className="itemPrice">
                <span>${item.price}</span>
              
                  
                  <span><img className="qtyImage" src="https://cdn-icons-png.flaticon.com/128/3524/3524388.png" alt="" />Qty - {item.quantity} <img className="qtyImage" src="https://cdn-icons-png.flaticon.com/128/56/56889.png" alt="" /></span>
               
                  
               
              </div>
              <button className="cartButton">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Aside Section */}
      <aside className="cart-summary">
        <h2>Cart Summary</h2>
        <div className="summary-details">
          <p>Total Price: ${totalPrice}</p>
          <button className="purchaseButton" onClick={handlePurchase}>
            Purchase
          </button>
        </div>
      </aside>
    </div>
    </div>
  );
}
