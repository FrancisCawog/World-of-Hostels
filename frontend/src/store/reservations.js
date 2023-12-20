import csrfFetch from "./csrf";
import { SET_LISTING } from "./listings";
import { RECEIVE_USER } from "./session";

const SET_RESERVATION = "listings/setReservation";

const setReservation = (listings) => ({
    type: SET_RESERVATION,
    payload: listings
});

export const createReservation = (reservation) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/reservations", {
          method: 'POST',
          body: JSON.stringify(reservation)
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setReservation(data));
        } else {
          throw new Error('Response not OK');
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
}

const reservationReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };

    switch (action.type) {
        case SET_RESERVATION:
            newState[action.payload.reservation] = action.payload.reservation;
            return newState;
        case RECEIVE_USER:
            return {...newState, ...action.reservations}
            case SET_LISTING:
            return {...newState, ...action.payload.reservations}
        default:
            return state;
    }
};

export default reservationReducer;


// export const fetchListings = () => async (dispatch) => {
//     const response = await csrfFetch("/api/listings");
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setListings(data));
//     } else {
//         throw response;
//     }
//     return response;
// }

// export const fetchReservation = () => async (dispatch) => {
//     const response = await csrfFetch(`/api/listings/${listingId}`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setListing(data));
//     } else {
//         throw response;
//     }
//     return response;
// }