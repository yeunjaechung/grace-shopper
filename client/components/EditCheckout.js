import React from "react";
import { connect } from "react-redux";
import { me } from "../store/auth";
import { updateUser } from "../store/userInfo";

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
    this.props.history.push("/checkout");
  }

  componentDidMount() {
    this.props.load();
    this.setState({
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      phoneNumber: this.props.auth.phoneNumber,
      shippingAddress: this.props.auth.shippingAddress,
      billingAddress: this.props.auth.billingAddress,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.phoneNumber !== this.props.auth.phoneNumber) {
      this.props.load();
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        phoneNumber: this.props.auth.phoneNumber,
        shippingAddress: this.props.auth.shippingAddress,
        billingAddress: this.props.auth.billingAddress,
      });
    } else if (prevProps.auth.firstName !== this.props.auth.firstName) {
      this.props.load();
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        phoneNumber: this.props.auth.phoneNumber,
        shippingAddress: this.props.auth.shippingAddress,
        billingAddress: this.props.auth.billingAddress,
      });
    } else if (prevProps.auth.lastName !== this.props.auth.lastName) {
      this.props.load();
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        phoneNumber: this.props.auth.phoneNumber,
        shippingAddress: this.props.auth.shippingAddress,
        billingAddress: this.props.auth.billingAddress,
      });
    } else if (
      prevProps.auth.shippingAddress !== this.props.auth.shippingAddress
    ) {
      this.props.load();
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        phoneNumber: this.props.auth.phoneNumber,
        shippingAddress: this.props.auth.shippingAddress,
        billingAddress: this.props.auth.billingAddress,
      });
    } else if (
      prevProps.auth.billingAddress !== this.props.auth.billingAddress
    ) {
      this.props.load();
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
      <section className="bg-whiteblue container" id="carousel">
        <div className="cartBox">
          <form onSubmit={handleSubmit}>
            <h2>
              Name: {firstName} {lastName}
            </h2>

            <label htmlFor="phoneNumber">phoneNumber: </label>
            <input
              name="phoneNumber"
              onChange={handleChange}
              value={phoneNumber}
            />

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
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    load: () => dispatch(me()),
    update: (auth) => dispatch(updateUser(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCheckout);
