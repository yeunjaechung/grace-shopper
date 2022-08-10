import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_AUTH = "UPDATE_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _updateAuth = (auth) => ({ type: UPDATE_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  const localStorage = window.localStorage;
  for (let key in localStorage) {
    if (+key) {
      localStorage.removeItem(key);
    }
  }
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    
    return dispatch(setAuth(res.data));
  }
};

export const updateAuth = (auth) => {
  const token = window.localStorage.getItem(TOKEN);
  return async function (dispatch) {
    const { data: updatedUser } = await axios.post("/auth/editCheckout", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_updateAuth(updatedUser));
  };
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  window.location.reload();
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_AUTH:
      return action.auth;
    default:
      return state;
  }
}
