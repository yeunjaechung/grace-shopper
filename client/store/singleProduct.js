import axios from "axios";

const TOKEN = "token";

// ACTIONS
const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = 'DELETE_ITEM';

// ACTION CREATORS
const setProduct = (product) => ({
  type: FETCH_SINGLE_PRODUCT,
  product,
});

const _addItem = (product) => ({
  type: ADD_ITEM,
  product,
});

const deleteItem = (product) => {
  return {
    type: DELETE_ITEM,
    product
  }
}

// THUNKS
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    dispatch(setProduct(product));
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    const {data: deletedProduct} = await axios.delete(`/api/products/${product.id}`);
    dispatch(deleteItem(deletedProduct));
  }
}

export const addItem = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async function (dispatch) {
    const response = await axios.post(
      `/api/users/addToCart`,
      product,
      {
        headers: {
          authorization: token,
        },
      }
    );
  
    // dispatch(_addItem(newItem));
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    case ADD_ITEM:
      return action.product;
      case
    default:
      return state;
  }
}
