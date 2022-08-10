import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromLocalStorage } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currentProduct: {},
      localStorage: {},
    };
    this.parseLocalStorage = this.parseLocalStorage.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
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

  updateQuantity() {
    
  }

  render() {
    let products = this.props.cart.products || [];
    let loggedOutCart = this.parseLocalStorage();
    const buttonCheck =
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

    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);

    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <ul>
              {products.map((product, index) => {
                return <CartItem product={product} key={index} />;
              })}
              <h1>Total: ${total / 100}</h1>
            </ul>
            {buttonCheck}
          </div>
        ) : (
          <div>
            <ul>
              {loggedOutCart.map((product) => {
                this.state.total += product.Order_Product.totalPrice;
                return (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageSmall} />
                    </Link>
                    <div>
                      <input
                        type="text"
                        defaultValue={product.Order_Product.quantity}
                      />
                      <button
                        onClick={() => {
                          updateQuantity();
                        }}
                      >
                        Update
                      </button>
                    </div>
                    <label>Quantity:</label>
                    {product.Order_Product.quantity}
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
                        window.location.reload();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <h1>Total: ${this.state.total / 100}</h1>
            </ul>
            {buttonCheck}
          </div>
        )}
      </div>
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
