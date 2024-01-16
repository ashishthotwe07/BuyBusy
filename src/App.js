import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import OrderPage from "./Components/Orders/OrderPage";
import CartPage from "./Components/Cart/CartPage";
import SignIn from "./Components/Forms/SingIn";
import SignUp from "./Components/Forms/SingUp";
import { AuthProvider } from "./Contexts/AuthContext";
import './tostify.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Products /> },
        { path: "signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "users/:uid/orders", element: <OrderPage /> },
        { path: "users/:uid/myCart", element: <CartPage /> },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer /> 
      </AuthProvider>
    </>
  );
}
