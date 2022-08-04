import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      subTotal: 0,
    };
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  increaseQuantity() {
    this.setState({ quantity: this.state.quantity++ });
  }
  decreaseQuantity() {
    this.setState({ quantity: this.state.quantity-- });
  }
  subTotalSum() {
    const sum = (this.state.quantity * this.props.product.price) / 100;
    this.setState({ subTotal: sum });
  }
  componentDidMount() {
    const id = this.props.product.productId;
    this.props.getProduct(id);
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
