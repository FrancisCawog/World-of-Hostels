const SET_ROOMS = "listings/setListing";
const SET_ALL_ROOMS = "listings/setListings";

const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_ROOMS:
            return {...action.payload.rooms}
        case SET_ROOMS:
            return action.payload.rooms;
        default:
            return state;
    }
};

export default roomReducer;