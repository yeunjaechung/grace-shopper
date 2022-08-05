import axios from "axios";

const FETCH_SINGLE_ORDER = "FETCH_SINGLE_ORDER";
const CLOSE_SINGLE_ORDER = "CLOSE_SINGLE_ORDER";

const setOrder = (checkoutOrder) => {
  return {
    type: FETCH_SINGLE_ORDER,
    checkoutOrder,
  };
};

const closedOrder = (checkoutOrder) => {
  return {
    type: CLOSE_SINGLE_ORDER,
    checkoutOrder,
  };
};

export const fetchOrder = (userId) => {
  return async function (dispatch) {
    const response = await axios.get(`/api/users/cart/${userId}`);
    const order = response.data;
    dispatch(setOrder(order));
  };
};

export const closeOrder = (userId) => {
  return async function (dispatch) {
    const response = await axios.put(`/api/users/checkout/${userId}`);
    const order = response.data;
    dispatch(closedOrder(order));
  };
};

const initialState = {};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_ORDER:
      return action.checkout;
    case CLOSE_SINGLE_ORDER:
        return action.checkout;
    default:
      return state;
  }
}
