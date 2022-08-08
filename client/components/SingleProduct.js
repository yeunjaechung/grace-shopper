import React from "react";
import { connect } from "react-redux";
import { fetchProduct, addItem } from "../store/singleProduct";
import { addToGuestCart } from "../store/order";

export class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  render() {
    const product = this.props.product;
    const isLoggedIn = this.props.isLoggedIn
    return (
      <div>
      {isLoggedIn ?
      <div>
        {" "}
        Product Name: {product.name}
        <button onClick={() => this.props.addItem(product)}>Add to Cart</button>
      </div> 
      : 
      <div>
      {" "}
      Product Name: {product.name}
      <button onClick={() => this.props.addToGuestCart(product)}>Add to Cart</button>
    </div> 
    }
    </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    addToGuestCart: (guestCart) => dispatch(addToGuestCart(guestCart))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
