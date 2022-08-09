import React from "react";
import { connect } from "react-redux";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import { addItem } from "../store/order";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   auth: {
    //     userType: ''
    //   }
    // }
    this.isAdmin = this.isAdmin.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.props.deleteProduct(this.props.product);
    window.location.reload();
  }
  render() {
    // let userType = this.state.auth.userType || '';
    console.log("THIS props in render", this.props);
    const product = this.props.product;
    if(!product){
      return <div>Pokemon Deleted! Go back to all products...
      </div>
    }
    if (this.props.user.userType === "admin") {
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price / 100}</h2>
          <button type="button" onClick={() => this.props.addItem(product)}>
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              // this.props.deleteProduct(product);
              // window.location.reload();
              this.handleClick();
            }}
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
   ;}}


const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
