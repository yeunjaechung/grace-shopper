import axios from "axios";

// ACTIONS
const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
const CREATE_PRODUCT = 'CREATE_PRODUCT';

// ACTION CREATORS
const setProducts = (products) => {
  return { type: FETCH_ALL_PRODUCTS, products };
};

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
};



// THUNKS
export const fetchProducts = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/products");
    const products = response.data;
    dispatch(setProducts(products));
  };
};

export const createNewProduct = (product) => {
  return async function (dispatch) {
    const { data: newProduct } = await axios.post(
      `/api/products/new-product`,
      product
    );
    dispatch(createProduct(newProduct));
  };
};


const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
