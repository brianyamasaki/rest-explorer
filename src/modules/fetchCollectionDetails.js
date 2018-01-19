import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_COLLECTION_DETAILS = 'fetch_collection_details/fetch';
export const FETCH_COLLECTION_DETAILS_SUCCESS =
  'fetch_collection_details/fetch_success';
export const FETCH_COLLECTION_DETAILS_FAIL =
  'fetch_collection_details/fetch_fail';

const initialState = {
  fetchObject: null,
  name: '',
  description: '',
  extent: '',
  itemsUrl: '',
  isLoading: false
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_COLLECTION_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_COLLECTION_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchObject: payload,
        itemsUrl: payload.links.children,
        name: payload.title,
        description: payload.description,
        extent: payload.extent
      };
    case FETCH_COLLECTION_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchCollectionDetails = id => dispatch => {
  dispatch({
    type: FETCH_COLLECTION_DETAILS
  });
  fetchJson(`${DENSHO_REST_BASE_URL}${id}/`)
    .then(json => {
      dispatch({
        type: FETCH_COLLECTION_DETAILS_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_COLLECTION_DETAILS_FAIL,
        payload: error
      });
    });
};
