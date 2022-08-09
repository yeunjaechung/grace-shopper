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
  addedToCart() {
    const productItem = {
      Order_Product: {
        productId: this.props.product.id,
        quantity: 1,
        unitPrice: this.props.product.price,
        totalPrice: this.props.product.price
      },
      id: this.props.product.id,
      name: this.props.product.name,
      price: this.props.product.price,
      imageLarge: this.props.product.imageLarge,
      imageSmall: this.props.product.imageSmall,
      flavorText: this.props.product.flavorText,
      nationalPokedexNumber: this.props.product.nationalPokedexNumber,
    };

    if (localStorage.getItem(`${this.props.product.id}`)) {
      let gotItem = localStorage.getItem(`${this.props.product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = parsedItem.Order_Product.quantity + 1;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price

      const addingItem = {
        Order_Product: {
          productId: this.props.product.id,
          quantity: newQuantity,
          unitPrice: this.props.product.price,
          totalPrice: total
        },
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price,
        imageLarge: this.props.product.imageLarge,
        imageSmall: this.props.product.imageSmall,
        flavorText: this.props.product.flavorText,
        nationalPokedexNumber: this.props.product.nationalPokedexNumber,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${this.props.product.id}`, updatedStringItem);
    } else {
      let stringItem = JSON.stringify(productItem);
      localStorage.setItem(`${this.props.product.id}`, stringItem);
    }
  }

  guestCartLoader() {
    const productItem = localStorage.getItem(`${this.props.product.id}`);
    const parsedItem = JSON.parse(productItem);
    this.props.addToGuestCart(parsedItem);
  }

  componentDidUpdate() {}

  isAdmin(userType) {
    return userType === "admin" ? true : false;
  }

  handleClick() {
    this.props.deleteProduct(this.props.product);
    window.location.reload();
  }
  render() {
    const product = this.props.product;
    if (!product) {
      return <div>Pokemon Deleted! Go back to all products...</div>;
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
      console.log("THIS props in render", product);
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type="button" onClick={() => this.addedToCart()}>
            Add to Cart
          </button>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
