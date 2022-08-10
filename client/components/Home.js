import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;
  console.log(props.auth);

  return (
    <div className="homepage">
      <h3>Welcome, {email}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    email: state.auth.email,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
