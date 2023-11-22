const SET_CART = "rooms/setRooms"
const REMOVE_CART = "rooms/removeRooms"
const CLEAR_CART = "rooms/clearRooms"

export const setCart = (roomId) => ({
    type: SET_CART,
    payload: roomId
});

export const removeCart = (roomId) => ({
    type: REMOVE_CART,
    payload: roomId
});

export const clearCart = () => ({
    type: CLEAR_CART,
  });

const cartReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case SET_CART:
            newState[action.payload] ||= 0;
            newState[action.payload]++;
            return {...newState}
        case REMOVE_CART:
            newState[action.payload]--;
            if (newState[action.payload] === 0){
                delete newState[action.payload]
            }
            return {...newState}
        case CLEAR_CART:
                return {};
        default:
            return state;
    }
};

export default cartReducer;