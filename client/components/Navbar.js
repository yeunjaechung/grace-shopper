import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";


const Navbar = ({ handleClick, isLoggedIn, cart, products }) => {
  let items = cart.products || [];
  let cartItems = items.reduce(function (accum, obj) {
    const {
      Order_Product: { quantity },
    } = obj;
    return accum + quantity;
  }, 0);

  let productsLength = products.length;

  return (
    <div>
      <h1>Welcome to the Pokemon TCG Store!</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <div className="linkHolder">
              <Link to="/home">Home</Link>
              <Link to="/products">Products({productsLength})</Link>
              <Link to="/cart">Cart({cartItems})</Link>
              <Link to="/editInfo">Edit Your Info</Link>
              {/* Will update after user pages are created 

            <Link to={`/${user.email}/orders`}>Order History</Link>
            */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="linkHolder">
              <Link to="/home">Home</Link>
              <Link to="/products">Products({productsLength})</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
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
