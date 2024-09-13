import csrfFetch from "./csrf.js";

export const RECEIVE_USER = 'session/receiveUser';
const REMOVE_USER = 'session/removeUser';

const receiveUser = (data) => ({
  type: RECEIVE_USER,
  user: data.user,
  reservations: data.reservations,
  reviews: data.reviews
});

const removeUser = () => ({
  type: REMOVE_USER
});

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data));
  return response;
};

export const login = ({ email, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      first_name: user.firstName,
      last_name: user.lastName,
      date_of_birth: user.dateOfBirth,
      email: user.email,
      password: user.password
    }),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data));
  return response;
};

export const updateUser = (user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      nationality: user.nationality,
      date_of_birth: user.date_of_birth,
      age: user.age
    }),
  });
  const data = await response.json();
  dispatch(receiveUser(data));
  return response;
};


export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeUser());
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
