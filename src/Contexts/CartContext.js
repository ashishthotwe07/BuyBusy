// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { ProductData } from '../data'; // Import your product data

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = async (productId) => {
    // Find the existing cart item based on product ID
    const existingCartItem = cart.find((item) => item.id === productId);

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      try {
        const cartDocRef = doc(db, 'productCart', existingCartItem.docId);
        await updateDoc(cartDocRef, {
          quantity: existingCartItem.quantity + 1,
        });

        // Update the local state with the updated quantity
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );

        // Display success toast notification
        toast.success('Added to Cart!');
      } catch (error) {
        console.error('Error updating quantity in cart:', error.message);
      }
    } else {
      // If the product is not in the cart, add it
      try {
        // Retrieve product details from ProductData based on the product ID
        const productToAdd = ProductData.find((product) => product.id === productId);

        // Add the product to the cart collection in Firestore
        const docRef = await addDoc(collection(db, 'productCart'), {
          ...productToAdd,
          quantity: 1,
          timestamp: serverTimestamp(),
        });

        // Update the local state with the added product
        setCart((prevCart) => [
          ...prevCart,
          { ...productToAdd, quantity: 1, docId: docRef.id },
        ]);

        // Display success toast notification
        toast.success('Added to Cart!');
      } catch (error) {
        console.error('Error adding product to cart:', error.message);
      }
    }
  };

  // Function to fetch the cart from Firestore
  const fetchCart = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productCart'));

      // Map the Firestore document data to the local state
      const cartData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      // Set the local state with the fetched cart data
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    }
  };

  // Fetch the cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Context value to be provided to consumers
  const value = {
    cart,
    addToCart,
    fetchCart,
  };

  // Provide the CartContext with the value to its children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
