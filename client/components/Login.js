import React from "react";
import { connect } from "react-redux";
import { fetchUsers, createUser } from "../store/login";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //on submit, we need to dispatch a login action
  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({
      email,
      password,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <section className="bg-whiteblue" id='carousel'>
        <h1>Login Test</h1>
        <div>
        <div>
          <AuthForm />
        </div>
          <div>{/*<CreateUser /> goes here*/}</div>
        </div>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Login);
