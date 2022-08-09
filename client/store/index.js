import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./allProducts";
import singleProductReducer from "./singleProduct";
import orderReducer from "./order";
import checkoutReducer from "./checkout";
import userReducer from "./userInfo";

const reducer = combineReducers({
  auth: auth,
  products: productsReducer,
  product: singleProductReducer,
  checkoutOrder: checkoutReducer,
  userReducer: userReducer,
  cart: orderReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
