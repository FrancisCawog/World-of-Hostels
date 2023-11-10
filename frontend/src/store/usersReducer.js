import { csrfFetch } from "./csrf";
import * as UserAPIUtil from "../util/user_api_util";

const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

const receiveUser = ({user}) => ({
    type: RECEIVE_USER,
    payload: user
})

const removeUser = userId => ({
    type: REMOVE_USER,
    payload: userId
});

export const loginUser = user => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data));
}

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    if (res.ok) {
        sessionStorage.setItem('currentUser', null);
        dispatch(removeUser(userId));
    }
}

export const signupUser = user => async (dispatch) => {
    const res = await UserAPIUtil.postUser(user);
    const data = await res.json();
    dispatch(receiveUser(data));
}

const usersReducer = (state = {}, action) => {
    const nextState = {...(Object.freeze(state))};

    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.payload];
            return nextState;
        default:
            return nextState;
    }
}

export default usersReducer;