import axios from "axios";

const TOKEN = "token";

// Actions
const GET_CART = "GET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
const GUEST_CART = "GUEST_CART";

// const UPDATE_ORDER_PRODCUTS = "UPDATE_ORDER_PRODCUTS";

// Action Creators
const _getCart = (cart) => ({
  type: GET_CART,
  cart,
});

// const _updateOrderProducts = (update) => ({
//   type: UPDATE_ORDER_PRODCUTS,
//   update,
// });

const _removeItem = (cart) => ({
  type: REMOVE_ITEM,
  cart,
});

// Action Creators
const _guestCart = (cart) => ({
  type: GUEST_CART,
  cart,
});

// Thunks
export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: cart } = await axios.get("/api/users/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_getCart(cart));
  };
};

export const removeItem = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: remove } = await axios.post(
      "/api/users/removeToCart",
      product,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_removeItem(remove));
  };
};

// Thunks
export const addToGuestCart = (cart) => {
  return async function (dispatch) {
    dispatch(_guestCart(cart));
  };
};

// export const removeItem = (productId) => {
//   return async();
// };

export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case GUEST_CART:
      return action.cart;
    case GET_CART:
      return action.cart;
    case REMOVE_ITEM:
      return action.cart;
    default:
      return state;
  }
}
