import csrfFetch from "./csrf";
import { SET_LISTING } from "./listings";
import { RECEIVE_USER } from "./session";

const SET_RESERVATION = "listings/setReservation";
const REMOVE_RESERVATION = 'listings/removeReservation';

const setReservation = (listings) => ({
    type: SET_RESERVATION,
    payload: listings
});

const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  payload: reservationId,
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

export const deleteReservation = (ReservationId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${ReservationId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeReservation(ReservationId));
  } else {
    throw response;
  }

  return response;
};


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
        case REMOVE_RESERVATION:
            const reservationIdToRemove = action.payload;
            const { [reservationIdToRemove]: _, ...updatedState } = { ...state };
            return updatedState;
        default:
            return state;
    }
};

export default reservationReducer;