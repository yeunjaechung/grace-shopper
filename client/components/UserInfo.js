import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUser, setUser } from "../store/userInfo";
import { me } from "../store/auth";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      shippingAddress: "",
      billingAddress: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({ ...this.props.auth, ...this.state });
  }

  componentDidMount() {
    this.props.me();
    this.setState({
      firstName: this.props.auth.firstName || "",
      lastName: this.props.auth.lastName || "",
      email: this.props.auth.email || "",
      phoneNumber: this.props.auth.phoneNumber || "",
      shippingAddress: this.props.auth.shippingAddress || "",
      billingAddress: this.props.auth.billingAddress || "",
    });
  }

  render() {
    //returns a form with the user's info that can be edited
    //let address = `${this.state.address1} ${this.state.address2} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    const { handleSubmit, handleChange } = this;
    return (
      <section className="bg-whiteblue container" id='carousel'>
      <div className="cartBox">
        <h4>Update User Details:</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name: </label>
          <input
            className="input-effect"
            name="firstName"
            onChange={handleChange}
            value={this.state.firstName}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="lastName">Last name: </label>
          <input
            className="input-effect"
            name="lastName"
            onChange={handleChange}
            value={this.state.lastName}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="shippingAddress">Shipping Address: </label>
          <input
            className="input-effect"
            name="shippingAddress"
            onChange={handleChange}
            value={this.state.shippingAddress}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="billingAddress">Billing Address: </label>
          <input
            className="input-effect"
            name="billingAddress"
            onChange={handleChange}
            value={this.state.billingAddress}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            className="input-effect"
            name="phoneNumber"
            onChange={handleChange}
            value={this.state.phoneNumber}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="email">Email: </label>
          <input
            className="input-effect"
            name="email"
            onChange={handleChange}
            value={this.state.email}
          />
          <span className="focus-border" />
          <br /> <br />
          <label htmlFor="password">Password: </label>
          <input
            className="input-effect"
            type="password"
            name="password"
            onChange={handleChange}
            value={this.state.password}
          />
          <span className="focus-border" />
          <br /> <br />
          <button type="submit">Submit</button>
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
    updateUser: (obj) => dispatch(updateUser(obj)),
    clearUser: () => dispatch(setUser()),
    me: () => dispatch(me()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
