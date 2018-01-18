import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const GET_ORG_LIST = 'densho/GET_ORGANIZATION_LIST';
export const GET_ORG_LIST_SUCCESS = 'densho/GET_ORG_LIST_SUCCESS';
export const GET_ORG_LIST_FAIL = 'densho/GET_ORG_LIST_FAIL';

const initialState = {
  organizationObject: null,
  isLoading: false
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORG_LIST:
      return {
        ...state,
        isLoading: true
      };

    case GET_ORG_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organizationObject: action.payload
      };

    case GET_ORG_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload
      };

    default:
      return state;
  }
};

// actions
export const getOrgList = () => dispatch => {
  dispatch({
    type: GET_ORG_LIST
  });
  fetchJson(`${DENSHO_REST_BASE_URL}ddr/children/`)
    .then(json => {
      dispatch({
        type: GET_ORG_LIST_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ORG_LIST_FAIL,
        payload: error
      });
    });
};
