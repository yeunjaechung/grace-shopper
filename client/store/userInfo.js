import axios from "axios";

// Action type
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const TOKEN = "token";

// Action creator
export const setUser = (auth) => {
  return {
    type: SET_USER,
    auth,
  };
};

export const _updateUser = (auth) => {
  return {
    type: UPDATE_USER,
    auth,
  };
};

// Thunks
export const fetchUser = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setUser(res.data));
  }
};

export const updateUser = (obj) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const { data } = await axios.put("/api/users/userInfo", obj, {
        headers: {
          authorization: token,
        },
      });
      console.log("data", data);
      dispatch(_updateUser(data));
    }
  } catch (err) {
    console.log(err);
  }
};

// Reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.auth;
    case UPDATE_USER:
      return { ...state, action: action.auth };
    default:
      return state;
  }
};

export default userReducer;
