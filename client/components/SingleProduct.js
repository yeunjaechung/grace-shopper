import React from "react";
import { connect } from "react-redux";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import { addItem } from "../store/order";
import UpdateProduct from "./UpdateProductForm";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    this.isAdmin = this.isAdmin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addedToCart = this.addedToCart.bind(this);
  }
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
    this.setState(this.props.product);
  }
  addedToCart() {
    const productItem = {
      Order_Product: {
        productId: this.props.product.id,
        quantity: 1,
        unitPrice: this.props.product.price,
        totalPrice: this.props.product.price,
      },
      id: this.props.product.id,
      name: this.props.product.name,
      price: this.props.product.price,
      imageLarge: this.props.product.imageLarge,
      imageSmall: this.props.product.imageSmall,
      flavorText: this.props.product.flavorText,
      nationalPokedexNumbers: this.props.product.nationalPokedexNumbers,
    };

    if (localStorage.getItem(`${this.props.product.id}`)) {
      let gotItem = localStorage.getItem(`${this.props.product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = parsedItem.Order_Product.quantity + 1;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;

      const addingItem = {
        Order_Product: {
          productId: this.props.product.id,
          quantity: newQuantity,
          unitPrice: this.props.product.price,
          totalPrice: total,
        },
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price,
        imageLarge: this.props.product.imageLarge,
        imageSmall: this.props.product.imageSmall,
        flavorText: this.props.product.flavorText,
        nationalPokedexNumbers: this.props.product.nationalPokedexNumbers,
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

  isAdmin(userType) {
    return userType === "admin" ? true : false;
  }

  handleClick() {
    this.props.deleteProduct(this.props.product);
    window.location.reload();
  }

  render() {
    const product = this.props.product || {};
    const isLoggedIn = this.props.isLoggedIn;
    if (!product) {
      return <div>Pokemon Deleted! Go back to all products...</div>;
    }
    return (
      <div>
        {isLoggedIn ? (
          this.props.user.userType === "admin" ? (
            <section className="bg-green" id="carousel">
              <div className="cartBox2">
              <div>
              <UpdateProduct product={product} />
              </div>
              <div className="cartBox2">
              <img src={product.imageSmall}></img>
              <div className="bg-white">
                <h1 className="center">Poke Name: {product.name}</h1>
                <h1 className="center">
                  Nat. Dex Number: {product.nationalPokedexNumbers}
                </h1>
                <h3 className="center">{product.flavorText}</h3>
                <h2 className="center">${+product.price / 100}</h2>
                <nav>
                  <button
                    className="center"
                    type="button"
                    onClick={() => this.props.addItem(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleClick();
                    }}
                  >
                    DELETE ITEM FROM DATABASE
                  </button>
                </nav>
              </div>
              </div>
              </div>
            </section>
          ) : (
            <section className="bg-whiteblue" id="carousel">
              <img src={product.imageSmall}></img>
              <div>
                <h1 className="center">Poke Name: {product.name}</h1>
                <h1 className="center">
                  Nat. Dex Number: {product.nationalPokedexNumbers}
                </h1>
                <h3 className="center">{product.flavorText}</h3>
                <h2 className="center">${+product.price / 100}</h2>
                <nav>
                  <button
                    className="center"
                    type="button"
                    onClick={() => this.props.addItem(product)}
                  >
                    Add to Cart
                  </button>
                </nav>
              </div>
            </section>
          )
        ) : (
          <section className="bg-whiteblue" id="carousel">
            <img src={product.imageSmall}></img>
            <div>
              <h1 className="center">Poke Name: {product.name}</h1>
              <h1 className="center">
                Nat. Dex Number: {product.nationalPokedexNumbers}
              </h1>
              <h3 className="center">{product.flavorText}</h3>
              <h2 className="center">${+product.price / 100}</h2>
              <nav>
                <button
                  onClick={() => {
                    this.addedToCart();
                  }}
                >
                  Add to Cart
                </button>
              </nav>
            </div>
          </section>
        )}
      </div>
    );
  }
}

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
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
