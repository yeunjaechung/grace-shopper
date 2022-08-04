import axios from "axios";

const FETCH_ALL_USERS = "FETCH_ALL_USERS";
const ADD_USER = "ADD_USER";

export const setUsers = (users) => {
  return { type: FETCH_ALL_USERS, users };
};

export const addUser = (user) => {
  return { type: ADD_USER, user };
}

export const fetchUsers = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/users");
    const users = response.data;
    dispatch(setUsers(users));
  };
};

export const createUser = (user) => {
  return async function (dispatch) {
    const response = await axios.post("/api/users", user);
    const newUser = response.data;
    dispatch(addUser(newUser));
  }
}

const initialState = [];

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}
