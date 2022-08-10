import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/allUsers";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllUsers extends React.Component {
  componentDidMount() {
    if (this.props.user.userType === "admin") {
      this.props.fetchUsers();
    }
  }
  render() {
    if (this.props.user.userType === "admin") {
      return (
        <div>
          <h1>All Users Component</h1>

          <hr />
          <div>
            {this.props.users.map((user) => (
              <div key={user.id}>
                <h3>Name: {user.firstName} {user.lastName}</h3>
                <ul>
                  <li>user email: {user.email}</li>
                  <li> user id: {user.id}</li>
                  <li> user created at: {user.createdAt}</li>
                  <li>user billing address: </li>
                  <li>
                    {" "}
                    {user.billingAddress
                      ? user.billingAddress
                      : "no billing address"}
                    user shipping address:{" "}
                  </li>
                  <li>
                    {" "}
                    {user.shippingAddress
                      ? user.shippingAddress
                      : "no shipping address"}
                  </li>

                  <li>
                    {" "}
                    user phone number:{" "}
                    {user.phoneNumber ? user.phoneNumber : "no phone number"}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <div>You should not be here</div>;
    }
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
