import axios from "axios";

const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";

export const setProducts = (products) => {
  return { type: FETCH_ALL_PRODUCTS, products };
};

export const fetchProducts = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/products");
    const products = response.data;
    dispatch(setProducts(products));
  };
};

const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
