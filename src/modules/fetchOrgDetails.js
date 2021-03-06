import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_ORG_DETAILS = 'fetch_org_details/fetch';
export const FETCH_ORG_DETAILS_SUCCESS = 'fetch_org_details/fetch_success';
export const FETCH_ORG_DETAILS_FAIL = 'fetch_org_details/fetch_fail';

const initialState = {
  fetchObject: null,
  collectionsUrl: '',
  name: '',
  description: '',
  websiteUrl: '',
  isLoading: false
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_ORG_DETAILS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ORG_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchObject: payload,
        collectionsUrl: payload.links.children,
        name: payload.title,
        description: payload.description,
        websiteUrl: payload.url
      };
    case FETCH_ORG_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchOrgDetails = id => dispatch => {
  dispatch({
    type: FETCH_ORG_DETAILS
  });
  fetchJson(`${DENSHO_REST_BASE_URL}${id}/`)
    .then(json => {
      dispatch({
        type: FETCH_ORG_DETAILS_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_ORG_DETAILS_FAIL,
        payload: error
      });
    });
};
