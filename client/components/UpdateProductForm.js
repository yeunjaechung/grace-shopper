import React from "react";
import { connect } from "react-redux";
import { updateProductThunk } from "../store/singleProduct";

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      flavorText: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}
  submitHandler(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    console.log("RENDER", this.props.product);
    return (
      <div>
        <h1 className="anchor-container">Edit Pokemon:</h1>
        <form onSubmit={this.submitHandler} className="cartBox">
          <label>Name:</label>
          <input
            value={this.state.name}
            type="text"
            name="name"
            onChange={this.handleChange}
          />
          <label>Price:</label>
          <input
            value={this.state.price}
            type="text"
            name="price"
            onChange={this.handleChange}
          />
          <label>Flavor Text:</label>
          <input
            value={this.state.flavorText}
            type="text"
            name="flavorText"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProductThunk(product)),
  };
};

export default connect(null, mapDispatch)(UpdateProduct);
