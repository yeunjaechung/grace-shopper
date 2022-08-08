import axios from "axios";

const TOKEN = "token";

// ACTIONS
const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";

// ACTION CREATORS
const setProduct = (product) => ({
  type: FETCH_SINGLE_PRODUCT,
  product,
});

// THUNKS
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    dispatch(setProduct(product));
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    // case ADD_ITEM:
    //   return action.product;
    default:
      return state;
  }
}
