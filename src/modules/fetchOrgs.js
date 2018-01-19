import {
  fetchJson,
  DENSHO_REST_BASE_URL,
  PAGING_OFFSET_STRING,
  findUrlParameter
} from '../shared';

export const GET_ORG_LIST = 'densho/GET_ORGANIZATION_LIST';
export const GET_ORG_LIST_SUCCESS = 'densho/GET_ORG_LIST_SUCCESS';
export const GET_ORG_LIST_FAIL = 'densho/GET_ORG_LIST_FAIL';

const initialState = {
  fetchObjects: [],
  organizations: [],
  nextUrl: '',
  isLoading: false,
  errMsg: ''
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
        fetchObjects:
          action.payload.index !== 0
            ? state.fetchObjects.concat(action.payload.data)
            : action.payload.data,
        organizations:
          action.payload.index !== 0
            ? state.organizations.concat(action.payload.data.objects)
            : action.payload.data.objects,
        nextUrl: action.payload.data.next,
        errMsg: ''
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
export const getOrgList = nextUrl => dispatch => {
  dispatch({
    type: GET_ORG_LIST
  });
  const url = nextUrl ? nextUrl : `${DENSHO_REST_BASE_URL}ddr/children/`;
  fetchJson(url)
    .then(data => {
      dispatch({
        type: GET_ORG_LIST_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: GET_ORG_LIST_FAIL,
        payload: error
      });
    });
};
