import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromLocalStorage } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = {
      total: 0,
      currentProduct: {},
      localStorage: {},
    };
    this.parseLocalStorage = this.parseLocalStorage.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.reRender = this.reRender.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  parseLocalStorage() {
    const localStorage = window.localStorage;
    let returnArr = [];
    for (let key in localStorage) {
      if (+key) {
        let parsed = JSON.parse(localStorage[key]);
        returnArr.push(parsed);
      }
    }
    return returnArr;
  }

  updateTotal(product) {
    this.setState({
      total:
        this.state.total +
        product.Order_Product.quantity * product.Order_Product.unitPrice,
    });
  }

  deleteFromLocalStorage(product) {
    localStorage.removeItem(`${product.id}`);
  }

  updateQuantity(product) {
    let quantity = Number(this.inputRef.current.value);
    if (localStorage.getItem(`${product.id}`)) {
      let gotItem = localStorage.getItem(`${product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = quantity;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;
      const addingItem = {
        Order_Product: {
          productId: product.id,
          quantity: newQuantity,
          unitPrice: product.price,
          totalPrice: total,
        },
        id: product.id,
        name: product.name,
        price: product.price,
        imageLarge: product.imageLarge,
        imageSmall: product.imageSmall,
        flavorText: product.flavorText,
        nationalPokedexNumber: product.nationalPokedexNumbers,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${product.id}`, updatedStringItem);
      this.reRender();
    }
  }

  handleQuantity(evt, product) {
    let quantity = Number([evt.target.value]);
    if (localStorage.getItem(`${product.id}`)) {
      let gotItem = localStorage.getItem(`${product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = quantity;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;
      const addingItem = {
        Order_Product: {
          productId: product.id,
          quantity: newQuantity,
          unitPrice: product.price,
          totalPrice: total,
        },
        id: product.id,
        name: product.name,
        price: product.price,
        imageLarge: product.imageLarge,
        imageSmall: product.imageSmall,
        flavorText: product.flavorText,
        nationalPokedexNumber: product.nationalPokedexNumbers,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${product.id}`, updatedStringItem);
      this.reRender();
    }
  }

  reRender() {
    this.state.total = 0;
    this.forceUpdate();
  }

  render() {
    let products = this.props.cart.products || [];
    let loggedOutCart = this.parseLocalStorage();
    const buttonCheckForUser =
      products.length > 0 ? (
        <Link to={"/checkout"}>
          <button>Proceed to checkout</button>
        </Link>
      ) : (
        <Link to={"/products"}>
          <button>Explore All Items!</button>
        </Link>
      );
    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
      );
    });

    const buttonCheckForGuest =
      loggedOutCart.length > 0 ? (
        <Link to={"/signup"}>
          <button>Proceed to Checkout</button>
        </Link>
      ) : (
        <Link to={"/products"}>
          <button>Explore All Items!</button>
        </Link>
      );
    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
      );
    });

    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);

    return (
      <section className="bg-whiteblue" id="carousel">
        {this.props.isLoggedIn ? (
          <div>
            <ul className="allProducts">
              {products.map((product, index) => {
                return <CartItem product={product} key={index} />;
              })}
            </ul>
            <div className="cartBox">
              <h1>Total: ${total / 100}</h1>
              {buttonCheckForUser}
            </div>
          </div>
        ) : (
          <div>
            <ul className="allProducts">
              {loggedOutCart.map((product) => {
                this.state.total += product.Order_Product.totalPrice;
                const renderCheck =
                  product.Order_Product.quantity < 10 ? (
                    <select
                      value={product.Order_Product.quantity}
                      onChange={(evt) => {
                        this.handleQuantity(evt, product);
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10+</option>
                    </select>
                  ) : (
                    <div>
                      <input
                        ref={this.inputRef}
                        type="text"
                        defaultValue={product.Order_Product.quantity}
                      />
                      <button
                        onClick={() => {
                          this.updateQuantity(product);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  );
                return (
                  <div className="cartBox" key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageSmall} />
                    </Link>
                    <label>Quantity:</label>
                    {renderCheck}
                    <br />
                    <br />
                    <span>
                      Unit Price: ${product.Order_Product.unitPrice / 100}
                    </span>
                    <h3>
                      Subtotal: $
                      {(product.Order_Product.quantity *
                        product.Order_Product.unitPrice) /
                        100}
                    </h3>
                    <button
                      onClick={() => {
                        this.deleteFromLocalStorage(product);
                        this.reRender();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </ul>
            <div className="cartBox">
              <h1>Total: ${this.state.total / 100}</h1>
              {buttonCheckForGuest}
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    auth: state.auth,
    // localStorage: () => {
    //   let localStorage = window.localStorage;
    //   let returnArr = [];
    //   for (let key in localStorage) {
    //     if (+key) {
    //       let parsed = JSON.parse(localStorage[key]);
    //       returnArr.push(parsed);
    //     }
    //   }
    //   return returnArr;
    // }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addToGuestCart: (guestCart) => dispatch(addToGuestCart(guestCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
