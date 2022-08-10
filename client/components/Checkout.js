import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/checkout";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export function Checkout({ cart, auth }) {
  let products = cart.products || [];
  products = products.sort(function (a, b) {
    return (
      new Date(b.Order_Product.createdAt) - new Date(a.Order_Product.createdAt)
    );
  });
  console.log(products);
  let total = products.reduce(function (accum, obj) {
    const {
      Order_Product: { totalPrice },
    } = obj;
    return accum + totalPrice;
  }, 0);
  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h3>Shipping Information</h3>
        <h5>
          Name: {auth.firstName} {auth.lastName}
        </h5>
        <h5>Address: {auth.shippingAddress}</h5>
        <Link to={"/checkout/edit"}>
          <button>Edit</button>
        </Link>
      </div>
      <div>
        <h3>Order Preview</h3>
        <ul>
          {products.map((product, index) => {
            return <CartItem product={product} key={index} />;
          })}
          <h1>Total: ${total / 100}</h1>
        </ul>
      </div>
      <Link to={`/cart/payment`}>
        <button>Onto Payment</button>
      </Link>
    </div>
  );
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

export default connect(mapState, null)(Checkout);
