import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/checkout";

export class Checkout extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.fetchOrder(userId);
  }
  render() {
    // const order = this.props.order;
    // const user = order.user;
    // const products = order.products;
    return (
      <div>
        Checkout Component
        <p>Shipping Address: User.shippingAddress </p>
        <p>Billing Address: User.billingAddress</p>
        <div>Order Review: Products: ul products.map...</div>
        <div>ContactInfo: user.email user.phone</div>
        <Link>On to payment</Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
