// Navbar.js
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Contexts/AuthContext"; // Import the useAuth hook
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const { currentUser, signOutFunc } = useAuth(); 
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      navigate('/'); // Redirect to the home page or any other page after signout
      toast.success('Sign Out Successful');
    } catch (error) {
      toast.error('Sign Out Error');
    }
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar">
          <div className="app-name">
            <span className="app-title">Buy Busy</span>
          </div>
          <div className="nav-links">
            {currentUser ? (
              // If user is signed in, show these options
              <>
                <NavLink to={"/"} className="nav-link">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5974/5974636.png"
                    alt="Home Icon"
                    className="nav-icon"
                  />
                  Home
                </NavLink>
                <NavLink to={"/users/:uid/orders"} className="nav-link">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                    alt="Orders Icon"
                    className="nav-icon"
                  />
                  Orders
                </NavLink>
                <NavLink to={"/users/:uid/myCart"} className="nav-link">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                    alt="Cart Icon"
                    className="nav-icon"
                  />
                  Cart
                </NavLink>
                <button className="nav-link signoutbtn" onClick={handleSignOut}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png"
                    alt="Logout Icon"
                    className="nav-icon"
                  />
                  Logout
                </button>
              </>
            ) : (
              // If user is not signed in, show these options
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
