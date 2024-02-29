const SET_CART = "rooms/setRooms";
const REMOVE_CART = "rooms/removeRooms";
const CLEAR_CART = "rooms/clearRooms";
const UPDATE_GUESTS = "rooms/updateGuests";
const SET_CHECK_IN = "rooms/setCheckIn";
const SET_CHECK_OUT = "rooms/setCheckOut";
const SET_LOCATION = "rooms/setLocation";

export const setCart = (roomId, refundable) => ({
    type: SET_CART,
    payload: roomId,
    refundable
});

export const removeCart = (roomId) => ({
    type: REMOVE_CART,
    payload: roomId
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const updateGuests = (numGuests) => ({
    type: UPDATE_GUESTS,
    payload: numGuests,
});

export const setCheckIn = (date) => ({
    type: SET_CHECK_IN,
    payload: date
});

export const setCheckOut = (date) => ({
    type: SET_CHECK_OUT,
    payload: date
});

export const setLocation = (location) => ({
    type: SET_LOCATION,
    payload: location
});

const cartReducer = (
    state = { cart: {}, guests: "", checkIn: '', checkOut: '', refundable: true, location: ""},
    action
  ) => {
    const newState = { ...state };

    switch (action.type) {
        case SET_CART:
            newState.cart[action.payload] ||= 0;
            newState.cart[action.payload]++;
            return { ...newState, refundable: action.refundable };

        case REMOVE_CART:
            newState.cart[action.payload]--;
            if (newState.cart[action.payload] === 0) {
                delete newState.cart[action.payload];
            }
            return { ...newState };

        case CLEAR_CART:
            return { cart: {}, guests: 1, checkIn: null, checkOut: null, location: null };

        case UPDATE_GUESTS:
            return { ...newState, guests: action.payload };

        case SET_CHECK_IN:
            return { ...newState, checkIn: action.payload };

        case SET_CHECK_OUT:
            return { ...newState, checkOut: action.payload };

        case SET_LOCATION:
            return { ...newState, location: action.payload };

        default:
            return state;
    }
};

export default cartReducer;
