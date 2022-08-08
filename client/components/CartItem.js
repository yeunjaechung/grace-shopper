import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      quantity: 1,
      subTotal: this.props.product.price / 100,
      temp: 1,
    };
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectSubtotal = this.selectSubtotal.bind(this);
    this.clickSubTotal = this.clickSubTotal.bind(this);
  }

  handleQuantity(evt) {
    let number = Number([evt.target.value]);
    this.setState({ quantity: number });
  }

  selectSubtotal(evt) {
    let quantity = Number([evt.target.value]);
    const sum = (quantity * this.props.product.price) / 100;

    this.setState({ subTotal: sum });
    this.props.totalSum(sum);
  }

  handleClick() {
    let number = Number(this.inputRef.current.value);
    this.setState({ quantity: number });
  }

  clickSubTotal() {
    let quantity = Number(this.inputRef.current.value);
    const sum = (quantity * this.props.product.price) / 100;
    this.setState({ subTotal: sum });
    this.props.totalSum(sum);
  }

  render() {
    const product = this.props.product;
    const { quantity } = this.state;
    const { handleClick, handleQuantity, selectSubtotal, clickSubTotal } = this;
    const renderCheck =
      quantity < 10 ? (
        <select
          value={quantity}
          onChange={(evt) => {
            handleQuantity(evt);
            selectSubtotal(evt);
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
          <input ref={this.inputRef} type="text" defaultValue={quantity} />
          <button
            onClick={() => {
              handleClick();
              clickSubTotal();
            }}
          >
            Update
          </button>
        </div>
      );

    return (
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product.imageSmall} />
        </Link>
        <label>Quantity:</label>
        {renderCheck}
        <h4>Subtotal: ${this.state.subTotal}</h4>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
