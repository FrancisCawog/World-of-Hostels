import csrfFetch from "./csrf";

const SET_LISTINGS = "listings/setListings";
const SET_LISTING = "listings/setListing";

const setListings = (listings) => ({
    type: SET_LISTINGS,
    payload: listings
});

const setListing = (payload) => ({
    type: SET_LISTING,
    payload
});

export const fetchListings = () => async (dispatch) => {
    const response = await csrfFetch("/api/listings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setListings(data.listings));
    } else {
        throw response;
    }
    return response;
}

export const fetchListing = (listingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setListing(data));
    } else {
        throw response;
    }
    return response;
}

const listingReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = {...state};

    switch (action.type) {
        case SET_LISTINGS:
            action.payload.forEach(listing => {
                newState[listing.id] = listing;
            });
            return newState;
        case SET_LISTING:
            newState[action.payload.listing.id] = action.payload.listing
            return newState;
        default:
            return state;
    }
}

export default listingReducer;