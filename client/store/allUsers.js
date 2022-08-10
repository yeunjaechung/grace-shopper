import axios from "axios";

// ACTIONS
const FETCH_ALL_USERS = "FETCH_ALL_USERS";

// ACTION CREATORS
const setUsers = (users) => {
  return { type: FETCH_ALL_USERS, users };
};

// THUNKS

export const fetchUsers = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/users");
    const users = response.data;
    console.log(users)
    dispatch(setUsers(users));
  };
};


const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.users
    default:
      return state;
  }
}
