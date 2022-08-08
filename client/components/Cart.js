import React from "react";
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
  }

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.cart.products && this.props.cart.product) {
  //     const products = this.props.cart.products;
  //     let tempArr = products.map((product) => {
  //       return product.Order_Product.quantity * product.price;
  //     });
  //     let sum = tempArr.reduce((accum, curr) => accum + curr);
  //     this.setState({ total: sum });
  //   }
  // }

  render() {
    const products = this.props.cart.products || [];
    return (
      <ul>
        {products.map((product, index) => {
          return <CartItem product={product} key={index} />;
        })}
        <h4>Total: ${this.state.total}</h4>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
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
