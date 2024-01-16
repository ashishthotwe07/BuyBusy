// ProductCard.js
import React from 'react';
import './ProductCard.css';
import { useCart } from '../../Contexts/CartContext';


export default function ProductCard({ product }) {

  const {addToCart} = useCart();
  return (

    
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-price">${product.price}</span>
        <button onClick={()=>addToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
}
