import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  render() {
    const product = this.props.product;
    return <div> Product Name: {product.name}
    <button>Add to Cart</button></div>;
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
