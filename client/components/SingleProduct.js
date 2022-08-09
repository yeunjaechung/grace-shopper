import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import { addItem } from "../store/order";
import { addToGuestCart } from "../store/order";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   auth: {
    //     userType: ''
    //   }
    // }
    this.isAdmin = this.isAdmin.bind(this);
  }
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  // componentDidUpdate(){
  //   this.setState({userType: this.state.auth.userType});
  // }
  isAdmin(userType) {
    return userType === "admin" ? true : false;
  }
  render() {
    // let userType = this.state.auth.userType || '';
    console.log("THIS props in render", this.props);
    const product = this.props.product;
    const isLoggedIn = this.props.isLoggedIn;

    if (!product) {
      return <div>Pokemon Deleted! Go back to all products...</div>;
    }
    if (this.props.user.userType === "admin") {
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type="button" onClick={() => this.props.addItem(product)}>
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => this.props.deleteProduct(product)}
          >
            DELETE ITEM FROM DATABASE
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type="button" onClick={() => this.props.addItem(product)}>
            Add to Cart
          </button>
        </div>
      );
    }
  }
}
/* needs to be resolved when final singleProduct Component!!!!!!!!!!!!!!!!!!!!!!
this was the main:
    const isLoggedIn = this.props.isLoggedIn
    return (
      <div>
        {isLoggedIn ? (
          <div>
            {" "}
            Product Name: {product.name}
            <Link to={"/cart"}>
              <button onClick={() => this.props.addItem(product)}>
                Add to Cart
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {" "}
            Product Name: {product.name}
            <button onClick={() => this.props.addToGuestCart(product)}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    );
  }
}
*/

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    addToGuestCart: (product) => dispatch(addToGuestCart(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
