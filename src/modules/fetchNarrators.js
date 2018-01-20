import {
  fetchJson,
  PAGING_OFFSET_STRING,
  findUrlParameter,
  DENSHO_REST_BASE_URL
} from '../shared';

export const FETCH_NARRATORS = 'fetch_narrators/fetch';
export const FETCH_NARRATORS_SUCCESS = 'fetch_narrators/fetch_success';
export const FETCH_NARRATORS_FAIL = 'fetch_narrators/fetch_fail';

const initialState = {
  fetchObjects: [],
  id: '',
  narrators: [],
  nextUrl: null,
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NARRATORS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_NARRATORS_SUCCESS:
      const fFirst = action.payload.index === 0;
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        fetchObjects: fFirst
          ? [action.payload.data]
          : state.fetchObjects.concat(action.payload.data),
        narrators: fFirst
          ? action.payload.data.objects
          : state.narrators.concat(action.payload.data.objects),
        nextUrl: action.payload.data.next,
        errMsg: ''
      };
    case FETCH_NARRATORS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchNarrators = url => dispatch => {
  dispatch({
    type: FETCH_NARRATORS
  });
  if (!url) url = `${DENSHO_REST_BASE_URL}narrator/`;
  fetchJson(url)
    .then(data => {
      dispatch({
        type: FETCH_NARRATORS_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_NARRATORS_FAIL,
        payload: error
      });
    });
};
