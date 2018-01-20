import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_FACET_DETAILS = 'fetch_facet_details/fetch';
export const FETCH_FACET_DETAILS_SUCCESS = 'fetch_facet_details/fetch_success';
export const FETCH_FACET_DETAILS_FAIL = 'fetch_facet_details/fetch_fail';

const initialState = {
  fetchObject: null,
  id: '',
  name: '',
  description: '',
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_FACET_DETAILS:
      return {
        ...state,
        isLoading: true,
        errMsg: ''
      };
    case FETCH_FACET_DETAILS_SUCCESS:
      return {
        ...state,
        fetchObject: payload,
        id: payload.id,
        name: payload.title,
        description: payload.description,
        isLoading: false
      };
    case FETCH_FACET_DETAILS_FAIL:
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
export const fetchFacetDetails = id => dispatch => {
  dispatch({
    type: FETCH_FACET_DETAILS
  });

  fetchJson(`${DENSHO_REST_BASE_URL}facet/${id}/`)
    .then(json => {
      dispatch({
        type: FETCH_FACET_DETAILS_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_FACET_DETAILS_FAIL,
        payload: error
      });
    });
};
