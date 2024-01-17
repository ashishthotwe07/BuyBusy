// CartPage.js
import React, { useEffect } from 'react';
import { useCart } from '../../Contexts/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, fetchCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePurchase = () => {
    console.log('Purchase button clicked!');
    // Add logic for completing the purchase
  };

  return (
    <div className="main">
      <h2 className="cartH2">Cart</h2>
      <div className="cart-page">
        {cart.length === 0 ? (
          // Display message when the cart is empty
          <div className="empty-cart-message">Nothing in the cart. <img src="https://cdn-icons-png.flaticon.com/128/13791/13791534.png" alt="" /></div>
        ) : (
          // Render cart items when there are items in the cart
          <div className="cartContainer">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-details">
                  <img className="item-image" src={item.image} alt="" />
                  <h3>{item.name}</h3>
                  <div className="itemPrice">
                    <span>${item.price}</span>
                    <span>
                      <img
                        className="qtyImage"
                        src="https://cdn-icons-png.flaticon.com/128/3524/3524388.png"
                        alt=""
                        onClick={() => updateQuantity(item.id)}
                      />
                      Qty - {item.quantity}{' '}
                      <img
                        className="qtyImage"
                        src="https://cdn-icons-png.flaticon.com/128/56/56889.png"
                        alt=""
                        onClick={() => updateQuantity(item.id, -1)}
                      />
                    </span>
                  </div>
                  <button className="cartButton" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          // Render purchasing section only when there are items in the cart
          <aside className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-details">
              <p>Total Price: ${totalPrice}</p>
              <button className="purchaseButton" onClick={handlePurchase}>
                Purchase
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
