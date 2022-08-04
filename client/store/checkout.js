import axios from "axios";

const FETCH_SINGLE_ORDER = "FETCH_SINGLE_ORDER";

const setOrder = (order) => {
  return {
    type: FETCH_SINGLE_ORDER,
    order,
  };
};

export const fetchOrder = (orderId) => {
  return async function (dispatch) {
    const response = await axios.get(`/api/users/cart/${orderId}`);
    const order = response.data;
    dispatch(setOrder(order));
  };
};

const initialState = {};

export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_ORDER:
      return action.order;
    default:
      return state;
  }
}
