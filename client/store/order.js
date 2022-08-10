import axios from "axios";

const TOKEN = "token";

// Actions
const GET_CART = "GET_CART";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ORDER_PRODUCTS = "UPDATE_ORDER_PRODUCTS";
const CLOSE_ORDER = "CLOSE_ORDER";
const GUEST_CART = "GUEST_CART";

// Action Creators
const _getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const _updateOrderProducts = (cart) => ({
  type: UPDATE_ORDER_PRODUCTS,
  cart,
});

const _addItem = (cart) => ({
  type: ADD_ITEM,
  cart,
});

const _removeItem = (cart) => ({
  type: REMOVE_ITEM,
  cart,
});

const _closeOrder = (cart) => ({
  type: CLOSE_ORDER,
  cart,
});

// Action Creators

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

export const updateOrderProduct = (product, updateInfo) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: cart } = await axios.post(
      "/api/users/updateOrderProduct",
      { product, updateInfo },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_updateOrderProducts(cart));
  };
};

export const addItem = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async function (dispatch) {
    const { data: cart } = await axios.post(`/api/users/addToCart`, product, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_addItem(cart));
  };
};

export const removeItem = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: cart } = await axios.post(
      "/api/users/removeFromCart",
      product,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_removeItem(cart));
  };
};

export const closeOrder = (cart, history) => {
  const token = window.localStorage.getItem(TOKEN);
  console.log(token);
  return async (dispatch) => {
    const { data: newCart } = await axios.post("api/users/payment", cart, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_closeOrder(newCart));
    history.push("/home");
  };
};

export const deleteFromLocalStorage = (product) => {
  localStorage.removeItem(`${product.id}`);
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
    case ADD_ITEM:
      return action.cart;
    case REMOVE_ITEM:
      return action.cart;
    case UPDATE_ORDER_PRODUCTS:
      return action.cart;
    case CLOSE_ORDER:
      return action.cart;
    default:
      return state;
  }
}
