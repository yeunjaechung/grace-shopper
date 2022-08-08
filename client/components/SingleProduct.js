import React from "react";
import { connect } from "react-redux";
import { fetchProduct, addItem } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  constructor(){
    super();
    this.isAdmin = this.isAdmin.bind(this);
  }
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  isAdmin(user){
    return user.userType === 'admin' ? true : false;
  }
  render() {
    console.log('THIS PROPS', this.props);
    const product = this.props.product;
    if(1===2){  //isAdmin(this.props.user)
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button onClick={() => this.props.addItem(product)}>Add to Cart</button>
        </div>
      )
    }else{
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button onClick={() => this.props.addItem(product)}>Add to Cart</button>
        </div>
      )
    }
    
   ;}}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
