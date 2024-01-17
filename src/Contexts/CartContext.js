// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { ProductData } from '../data';
import { useAuth } from './AuthContext'; // Import your AuthContext

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();

  const cartCollectionRef = collection(db, 'productCart');

  const removeFromCart = async (productId) => {
    try {
      const cartItem = cart.find((item) => item.id === productId);

      if (cartItem) {
        await deleteDoc(doc(db, 'productCart', cartItem.docId));
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast.success('Removed from Cart!');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error.message);
    }
  };

  const updateQuantity = async (productId, increment = 1) => {
    try {
      const cartItem = cart.find((item) => item.id === productId);

      if (cartItem) {
        const cartDocRef = doc(db, 'productCart', cartItem.docId);
        const currentQuantity = cartItem.quantity;
        const newQuantity = currentQuantity + increment;

        await updateDoc(cartDocRef, { quantity: newQuantity });

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );

        toast.success('Quantity updated!');
      }
    } catch (error) {
      console.error('Error updating quantity in cart:', error.message);
    }
  };

  const fetchCart = async () => {
    try {
      if (currentUser) {
        const userCartQuery = query(cartCollectionRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(userCartQuery);

        const cartData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        setCart(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser]);

  const addToCart = async (productId) => {
    if (currentUser) {
      const existingCartItem = cart.find((item) => item.id === productId);

      if (existingCartItem) {
        try {
          const cartDocRef = doc(db, 'productCart', existingCartItem.docId);
          await updateDoc(cartDocRef, {
            quantity: existingCartItem.quantity + 1,
          });

          setCart((prevCart) =>
            prevCart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );

          toast.success('Added to Cart!');
        } catch (error) {
          console.error('Error updating quantity in cart:', error.message);
        }
      } else {
        try {
          const productToAdd = ProductData.find((product) => product.id === productId);
          const docRef = await addDoc(cartCollectionRef, {
            userId: currentUser.uid,
            ...productToAdd,
            quantity: 1,
            timestamp: serverTimestamp(),
          });

          setCart((prevCart) => [
            ...prevCart,
            { ...productToAdd, quantity: 1, docId: docRef.id },
          ]);

          toast.success('Added to Cart!');
        } catch (error) {
          console.error('Error adding product to cart:', error.message);
        }
      }
    }
  };

  const value = {
    cart,
    addToCart,
    fetchCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
