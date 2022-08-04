import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getCart(this.props.auth.id);
  }
  render() {
    const cart = this.state.cart || {};
    const products = cart.id ? cart.order[0].Order_Profile : []; // not sure if the returned data type of Order_Profile is either an object or an array
    return (
      <div>
        {products.map((product, index) => {
          return <CartItem product={product} key={index} />;
        })}
      </div>
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
    getCart: (userId) => dispatch(getCart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
