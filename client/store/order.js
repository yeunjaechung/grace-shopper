import axios from "axios";

// Actions
const GET_CART = "GET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";

// Action Creators
const _getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const _removeItem = (item) => ({
  type: REMOVE_ITEM,
  item,
});
// Thunks
export const getCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/users/viewcart/${userId}`);
    dispatch(_getCart(cart));
  };
};

export const removeItem = (productId) => {
  return async();
};

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
