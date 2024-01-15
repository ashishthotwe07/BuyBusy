// Navbar.js
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar">
          <div className="app-name">
            <span className="app-title">Buy Busy</span>
          </div>
          <div className="nav-links">
            <NavLink to={"/"} className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5974/5974636.png"
                alt="Home Icon"
                className="nav-icon"
              />
              Home
            </NavLink>
            <NavLink to={"/signin"} className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1646/1646779.png"
                alt="Sign In Icon"
                className="nav-icon"
              />
              Sign In
            </NavLink>
            <NavLink to={"/users/123/orders"} className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                alt="Orders Icon"
                className="nav-icon"
              />
              Orders
            </NavLink>
            <NavLink to={"/users/123/myCart"} className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                alt="Cart Icon"
                className="nav-icon"
              />
              Cart
            </NavLink>
            <NavLink to={"/logout"} className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png"
                alt="Logout Icon"
                className="nav-icon"
              />
              Logout
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
