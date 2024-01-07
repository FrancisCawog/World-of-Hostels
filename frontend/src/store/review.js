import csrfFetch from "./csrf";
import { SET_LISTING } from "./listings";
import { RECEIVE_USER } from "./session";

const SET_REVIEW = "listings/setReview";
const SET_ALL_REVIEWS = "listings/setListings";

const setReview = (listings) => ({
    type: SET_REVIEW,
    payload: listings
});

export const createReview = (review) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/reviews", {
          method: 'POST',
          body: JSON.stringify(review)
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setReview(data));
        } else {
          throw new Error('Response not OK');
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
}

const reviewReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };

    switch (action.type) {
        case SET_REVIEW:
            const newReview = action.payload.review;
            newState[newReview.id] = newReview; // Assuming each review has a unique ID
            return newState;
        case SET_LISTING:
            return {...newState, ...action.payload.reviews}
        case SET_ALL_REVIEWS:
            return {...action.payload.reviews}
        case RECEIVE_USER:
            return {...newState, ...action.reviews}
        default:
            return state;
    }
};

export default reviewReducer;