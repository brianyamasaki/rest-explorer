import { fetchJson, PAGING_OFFSET_STRING, findUrlParameter } from '../shared';

export const FETCH_COLLECTION = 'fetch_collection/fetch';
export const FETCH_COLLECTION_SUCCESS = 'fetch_collection/fetch_success';
export const FETCH_COLLECTION_FAIL = 'fetch_collection/fetch_fail';

const initialState = {
  fetchObjects: [],
  id: '',
  collections: [],
  nextUrl: null,
  isLoading: false,
  collectionsTotal: 0,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_COLLECTION_SUCCESS:
      const isFirstSet = action.payload.index === 0;
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        fetchObjects: isFirstSet
          ? [action.payload.data]
          : state.fetchObjects.concat(action.payload.data),
        collections: isFirstSet
          ? action.payload.data.objects
          : state.collections.concat(action.payload.data.objects),
        nextUrl: action.payload.data.next,
        collectionsTotal: action.payload.data.total,
        errMsg: ''
      };
    case FETCH_COLLECTION_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchCollection = url => dispatch => {
  dispatch({
    type: FETCH_COLLECTION
  });
  fetchJson(url)
    .then(data => {
      dispatch({
        type: FETCH_COLLECTION_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_COLLECTION_FAIL,
        payload: error
      });
    });
};
