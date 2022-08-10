import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";
import { updateOrderProduct, removeItem } from "../store/order";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      quantity: 1,
      unitPrice: this.props.product.price,
      totalPrice: this.unitPrice * this.quantity
    };
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleQuantity(evt) {
    let quantity = Number([evt.target.value]);
    const totalPrice = quantity * this.props.product.price;
    let updateInfo = {
      quantity,
      unitPrice: this.state.unitPrice,
      totalPrice: totalPrice,
    };
    this.props.updateOrder(this.props.product, updateInfo);
    this.setState({ quantity, totalPrice });
  }

  handleClick() {
    let quantity = Number(this.inputRef.current.value);
    const totalPrice = quantity * this.props.product.price;
    let updateInfo = {
      quantity,
      unitPrice: this.state.unitPrice,
      totalPrice: totalPrice,
    };
    this.props.updateOrder(this.props.product, updateInfo);
    this.setState({ quantity, totalPrice });
  }

  handleDelete() {
    this.props.removeProduct(this.props.product);
  }

  componentDidMount() {
    const quantity = this.props.product.Order_Product.quantity;
    const totalPrice = quantity * this.props.product.price;
    this.setState({ quantity, totalPrice });
  }

  render() {
    const { product } = this.props;
    const { quantity, unitPrice, totalPrice } = this.state;
    const { handleClick, handleQuantity, handleDelete } = this;
    const renderCheck =
      quantity < 10 ? (
        <select
          value={quantity}
          onChange={(evt) => {
            handleQuantity(evt);
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
            }}
          >
            Update
          </button>
        </div>
      );

    return (
      <div className="cartBox">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageSmall} />
        </Link>
        <label>Quantity:</label>
        {renderCheck}
        <br />
        <br />
        <span>Unit Price: ${unitPrice / 100}</span>
        <h3>Subtotal: ${totalPrice / 100}</h3>
        <button onClick={handleDelete}>Delete</button>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateOrder: (product, updateInfo) =>
      dispatch(updateOrderProduct(product, updateInfo)),
    removeProduct: (product) => dispatch(removeItem(product)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
