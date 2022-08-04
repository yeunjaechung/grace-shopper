import axios from "axios";

const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT"

const setProduct = (product) => {
  return {
    type: FETCH_SINGLE_PRODUCT,
    campus,
  };
};

export const fetchProduct = (productId) => {
  return async function (dispatch) {
    const response = await axios.get(`/api/products/${productId}`);
    const product = response.data;
    dispatch(setProduct(product));
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product
    default:
      return state;
  }
}