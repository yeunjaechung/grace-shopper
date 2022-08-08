import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, addToGuestCart } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.totalSum = this.totalSum.bind(this);
  }

  totalSum(subTotal) {
    this.setState({ total: this.state.total + subTotal });
  }

  //   componentDidMount() {
  //     this.props.fetchCart();
  //     this.setState({ ...this.state, products: this.props.cart.products });
  //   }
  render() {
    const products = this.props.cart.products || [];
    return (
      <ul>
        {products.map((product, index) => {
          return (
            <CartItem
              key={index}
              product={product}
              total={this.state.total}
              totalSum={this.totalSum}
            />
          );
        })}
        <h4>Total: ${this.state.total}</h4>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.order,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addToGuestCart: (guestCart) => dispatch(addToGuestCart(guestCart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
