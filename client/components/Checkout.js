import React from "react";
import { connect } from "react-redux";
import { me } from "../store";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

class Checkout extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    let products = this.props.cart.products || [];
    let auth = this.props.auth || {};
    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
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
      <section className="bg-whiteblue container" id='carousel'>
        <div className="cartBox">
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
        </div>
        <div>
          <h3>Order Preview</h3>
          <ul>
            {products.map((product, index) => {
              return <CartItem product={product} key={index} />;
            })}
            
          </ul>
          <h1>Total: ${total / 100}</h1>
          <Link to={`/payment`}>
          <button>Onto Payment</button>
        </Link>
        </div>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
