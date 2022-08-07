import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {

  constructor(props) {
    super(props);

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
              product={product}
              key={index}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
