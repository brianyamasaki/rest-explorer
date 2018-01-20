import {
  fetchJson,
  DENSHO_REST_BASE_URL,
  PAGING_OFFSET_STRING,
  findUrlParameter
} from '../shared';

export const FETCH_FACETS = 'fetch_facets/FETCH';
export const FETCH_FACETS_SUCCESS = 'fetch_facets/FETCH_FACETS_SUCCESS';
export const FETCH_FACETS_FAIL = 'fetch_facets/FETCH_FACETS_FAIL';

const initialState = {
  fetchObjects: [],
  facets: [],
  nextUrl: '',
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FACETS:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_FACETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchObjects:
          action.payload.index !== 0
            ? state.fetchObjects.concat(action.payload.data)
            : action.payload.data,
        facets:
          action.payload.index !== 0
            ? state.organizations.concat(action.payload.data.objects)
            : action.payload.data.objects,
        nextUrl: action.payload.data.next,
        errMsg: ''
      };

    case FETCH_FACETS_FAIL:
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
export const fetchFacets = nextUrl => dispatch => {
  dispatch({
    type: FETCH_FACETS
  });
  const url = nextUrl ? nextUrl : `${DENSHO_REST_BASE_URL}facet/`;
  fetchJson(url)
    .then(data => {
      dispatch({
        type: FETCH_FACETS_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: FETCH_FACETS_FAIL,
        payload: error
      });
    });
};
