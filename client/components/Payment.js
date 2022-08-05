import React from "react";
import { connect } from "react-redux";
import { closeOrder } from "../store/checkout";
import { Link } from "react-router-dom";

export class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      paid: false
    }
    this.submitPayment = this.submitPayment.bind(this);
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.fetchOrder(userId);
  }
  submitPayment() {
    this.props.closeOrder(userId);
    this.setState({ paid: true });
  }
  render() {
    const order = this.props.order;
   
    return (
      <div>
        {order.status === "closed" ? (
          <div> Thank you for shopping, here is your receipt! 
          <receipt></receipt>
          </div>
            
        ) : (
          <div> 
          {order}
    <button onClick={this.submitPayment}>Submit Order</button>
    </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    closeOrder: (userId) => dispatch(closeOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(Payment);
