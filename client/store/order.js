import axios from "axios";

// Actions
const GET_CART = "GET_CART";

// Action Creators
const _getcart = (cart) => ({
  type: GET_CART,
  cart,
});

// Thunks
export const getCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/viewcart/${userId}`);
    dispatch(_getCart(cart));
  };
};

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
