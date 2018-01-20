import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_NARRATOR_DETAILS = 'fetch_narrator_details/fetch';
export const FETCH_NARRATOR_DETAILS_SUCCESS =
  'fetch_narrator_details/fetch_success';
export const FETCH_NARRATOR_DETAILS_FAIL = 'fetch_narrator_details/fetch_fail';

const initialState = {
  fetchObject: null,
  id: '',
  displayName: '',
  firstName: '',
  lastName: '',
  middleName: '',
  links: '',
  bio: '',
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_NARRATOR_DETAILS:
      return {
        ...state,
        isLoading: true,
        errMsg: ''
      };
    case FETCH_NARRATOR_DETAILS_SUCCESS:
      return {
        ...state,
        fetchObject: payload,
        id: payload.id,
        displayName: payload.display_name,
        firstName: payload.first_name,
        lastName: payload.last_name,
        middleName: payload.middle_name,
        links: payload.links,
        bio: payload.bio,
        isLoading: false
      };
    case FETCH_NARRATOR_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload
      };
    default:
      return state;
  }
};

// action
export const fetchNarratorDetails = id => dispatch => {
  dispatch({
    type: FETCH_NARRATOR_DETAILS
  });

  fetchJson(`${DENSHO_REST_BASE_URL}narrator/${id}/`)
    .then(json => {
      dispatch({
        type: FETCH_NARRATOR_DETAILS_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_NARRATOR_DETAILS_FAIL,
        payload: error
      });
    });
};
