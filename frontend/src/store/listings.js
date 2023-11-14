import csrfFetch from "./csrf";

const SET_LISTINGS = "listings/setListings";
const SET_LISTING = "listings/setListing";

const setListings = (listings) => ({
    type: SET_LISTINGS,
    payload: listings
});

const setListing = (listing) => ({
    type: SET_LISTING,
    payload: listing
});

export const fetchListings = () => async (dispatch) => {
    const response = await csrfFetch("api/listings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setListings(data.listing));
    } else {
        throw response;
    }
    return response;
}

export const fetchListing = (listingId) => async (dispatch) => {
    const response = await csrfFetch(`api/listings/${listingId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setListing(data.listing));
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
            return {...newState, ...action.listings };
        case SET_LISTING:
            newState[action.listing.id] = action.listing;
            return newState;
        default:
            return state;
    }
}

export default listingReducer;