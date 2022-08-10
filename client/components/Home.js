import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;
  const { isLoggedIn } = props;
  console.log(props.auth);

  return (
    <section className="bg-whiteblue container" id="carousel">
      {isLoggedIn ? (
        <div>
          <h3 className="anchor-container">Welcome, {email}</h3>
          <div className="homepage "></div>
        </div>
      ) : (
        <div className="homepage "></div>
      )}
    </section>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    email: state.auth.email,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
