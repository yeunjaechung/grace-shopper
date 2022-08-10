import axios from "axios";

const TOKEN = "token";

// ACTIONS
const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

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

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

// THUNKS
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try{
      const { data: product } = await axios.get(`/api/products/${productId}`);
      dispatch(setProduct(product));
    }catch(err){
      console.log(err);
    }
    
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    try{
      const { data: deletedProduct } = await axios.delete(
        `/api/products/${product.id}`
      );
      dispatch(deleteItem(deletedProduct));
    }catch(err){
      console.log(err);
    }
  };
};

export const updateProductThunk = (product) => {
  return async (dispatch) => {
    try{
      const {id} = product;
      const {data: updatedProduct} = await axios.put(`/api/products/update/${id}`, product);
      dispatch(updateProduct(updatedProduct));
    }catch(err){
      console.log(err)
    }
  }
}

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    case DELETE_ITEM:
      return null;
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
