import csrfFetch from "./csrf";

const SET_LISTINGS = "listings/setListings";
export const SET_LISTING = "listings/setListing";

const setListings = (listings) => ({
    type: SET_LISTINGS,
    payload: listings
});

const setListing = (payload) => ({
    type: SET_LISTING,
    payload
});

export const fetchListings = (start_date, end_date) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/?start_date=${start_date}&end_date=${end_date}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setListings(data));
    } else {
        throw response;
    }
    return response;
}

export const fetchListing = (listingId, start_date, end_date) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/${listingId}?start_date=${start_date}&end_date=${end_date}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setListing(data));
    } else {
        throw response;
    }
    return response;
};

const listingReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };

    switch (action.type) {
        case SET_LISTINGS:
            return {...action.payload.listings}
        case SET_LISTING:
            newState[action.payload.listing.id] = action.payload.listing;
            return newState;
        default:
            return state;
    }
};

export default listingReducer;