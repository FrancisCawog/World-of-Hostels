import csrfFetch from "./csrf";

const SET_USERS = "users/setUsers";

const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch("/api/users");
    if (response.ok) {
        const data = await response.json();
        dispatch(setUsers(data));
    } else {
        throw response;
    }
    return response;
}

const userReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case SET_USERS:
            return action.payload.users
        default:
            return state;
    }
};

export default userReducer;