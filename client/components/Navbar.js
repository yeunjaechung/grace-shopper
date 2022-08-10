import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, cart, products, isAdmin }) => {
  let items = cart.products || [];
  let cartItems = items.reduce(function (accum, obj) {
    const {
      Order_Product: { quantity },
    } = obj;
    return accum + quantity;
  }, 0);
  let productsLength = products.length;

  return (
    <header className="bg-blue">
      <nav>
      <h1 className="anchor-container">GS: Pokemon TCG Shop</h1>
        {isLoggedIn ? (
          isAdmin ? (<div>
            {/* The navbar will show these links after you log in */}
            <div className="linkHolder">
              <div className="anchor-container">
                <Link to="/home">Home</Link>
              </div>
              <div className="anchor-container">
                <Link to="/products">Products({productsLength})</Link>
              </div>
              <div className="anchor-container">
                <Link to="/cart">Cart({cartItems})</Link>
              </div>
              <div className="anchor-container">
                <Link to="/editInfo">Edit Your Info</Link>
              </div>

              <div className="anchor-container">
                <Link to="/users">View Users</Link>
              </div>
              <div className="anchor-container">
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            </div>
          </div>)

          :
          (<div>
            {/* The navbar will show these links after you log in */}
            <div className="linkHolder">
              <div className="anchor-container">
                <Link to="/home">Home</Link>
              </div>
              <div className="anchor-container">
                <Link to="/products">Products({productsLength})</Link>
              </div>
              <div className="anchor-container">
                <Link to="/cart">Cart({cartItems})</Link>
              </div>
              <div className="anchor-container">
                <Link to="/editInfo">Edit Your Info</Link>
              </div>
              <div className="anchor-container">
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            </div>
          </div>)
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="linkHolder">
              <div className="anchor-container">
                <Link to="/home">Home</Link>
              </div>
              <div className="anchor-container">
                <Link to="/products">Products({productsLength})</Link>
              </div>
              <div className="anchor-container">
                <Link to="/cart">Cart</Link>
              </div>
              <div className="anchor-container">
                <Link to="/login">Login / Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.userType === "admin",
    cart: state.cart,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
