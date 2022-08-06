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
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  increaseQuantity() {
    this.setState({ quantity: this.state.quantity++ });
    const sum = (this.state.quantity * this.props.product.price) / 100;
    this.setState({ subTotal: sum });
    this.props.totalSum(this.state.subTotal);
  }
  decreaseQuantity() {
    this.setState({ quantity: this.state.quantity-- });
    const sum = (this.state.quantity * this.props.product.price) / 100;
    this.setState({ subTotal: sum });
    this.props.totalSum(this.state.subTotal);
  }

  handleQuantity(evt) {
    this.setState({ quantity: evt.target.value });
  }

  componentDidMount() {
    const id = this.props.product.productId;
    this.props.getProduct(id);
    const sum = (this.state.quantity * this.props.product.price) / 100;
    this.setState({ subTotal: sum });
    this.props.totalSum(this.state.subTotal);
  }

  render() {
    const product = this.props.product || {};
    const { increaseQuantity, decreaseQuantity, handleQuantity } = this;
    return (
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product.imageSmall} />
        </Link>
        <button type="button" onClick={increaseQuantity}>
          +
        </button>
        <input onChange={handleQuantity} value={this.state.quantity}>
          {this.state.quantity}
        </input>
        <button type="button">-</button>
      </div>
    );
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
