import React from "react";
import { connect } from "react-redux";
import { me, updateAuth } from "../store/auth";

class EditCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.auth.firstName ? this.props.auth.firstName : "",
      lastName: this.props.auth.lastName ? this.props.auth.lastName : "",
      phoneNumber: this.props.auth.phoneNumber
        ? this.props.auth.phoneNumber
        : "",
      shippingAddress: this.props.auth.shippingAddress
        ? this.props.auth.shippingAddress
        : "",
      billingAddress: this.props.auth.billingAddress
        ? this.props.auth.billingAddress
        : "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    } = this.state;
    const newInfo = {
      ...this.props.auth,
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    };
    this.props.update(newInfo);
  }

  componentDidMount() {
    this.props.load();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        phoneNumber: this.props.auth.phoneNumber,
        shippingAddress: this.props.auth.shippingAddress,
        billingAddress: this.props.auth.billingAddress,
      });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <h2>
          Name: {firstName} {lastName}
        </h2>

        <label htmlFor="phoneNumber">phoneNumber: </label>
        <input name="phoneNumber" onChange={handleChange} value={phoneNumber} />

        <label htmlFor="shippingAddress">shippingAddress: </label>
        <input
          name="shippingAddress"
          onChange={handleChange}
          value={shippingAddress}
        />

        <label htmlFor="billingAddress">billingAddress: </label>
        <input
          name="billingAddress"
          onChange={handleChange}
          value={billingAddress}
        />
        <br />
        <br />

        <button type="submit">Save Change</button>
        {/* <Link to="/">Cancel</Link> */}
        <button type="button" onClick={() => this.props.history.goBack()}>
          Cancel
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(me()),
    update: (auth) => dispatch(updateAuth(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCheckout);
