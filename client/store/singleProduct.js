import axios from "axios";

const TOKEN = "token";

// ACTIONS
const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";

const DELETE_ITEM = 'DELETE_ITEM';

// ACTION CREATORS
const setProduct = (product) => ({
  type: FETCH_SINGLE_PRODUCT,
  product,
});

const deleteItem = (product) => {
  return {
    type: DELETE_ITEM,
    product,
  };
};

// THUNKS
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    dispatch(setProduct(product));
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {

    const { data: deletedProduct } = await axios.delete(
      `/api/products/${product.id}`
    );
    dispatch(deleteItem(deletedProduct));
  };
};
const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    case DELETE_ITEM:
      return null;
    default:
      return state;
  }
}
