const SET_ROOMS = "listings/setListing";

const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ROOMS:
            return action.payload.rooms;
        default:
            return state;
    }
};

export default roomReducer;