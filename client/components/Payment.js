import React from "react";
import { connect } from "react-redux";
import { closeOrder, fetchCart } from "../store/order";
import { me } from "../store";
import { Link } from "react-router-dom";

export class Payment extends React.Component {
  constructor() {
    super();
    this.submitPayment = this.submitPayment.bind(this);
  }

  submitPayment() {
    this.props.close(this.props.cart);
  }

  render() {
    const { submitPayment } = this;
    console.log(this.props.auth);
    const products = this.props.cart.products || [];
    let cartItems = products.reduce(function (accum, obj) {
      const {
        Order_Product: { quantity },
      } = obj;
      return accum + quantity;
    }, 0);
    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);

    return (
      <section className="bg-whiteblue container" id='carousel'>
        <ul>
          {products.map((product, index) => {
            return (
              <div key={index}>
                <img src={product.imageSmall} />
                <h4>Name: {product.name}</h4>
                <h4>Price: ${product.price / 100}</h4>
                <h4></h4>
              </div>
            );
          })}
        </ul>
        <div>
          <h2>Total items: {cartItems}</h2>
          <h2>Subtotal: ${total / 100}</h2>
        </div>
        <button onClick={() => {
          submitPayment();
          alert("Thank you for your purchase!");
        }}>Make a payment</button>
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

const mapDispatch = (dispatch, { history }) => {
  return {
    close: (cart) => dispatch(closeOrder(cart, history)),
    load: () => dispatch(fetchCart()),
    setAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Payment);
