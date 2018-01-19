import { fetchJson, PAGING_OFFSET_STRING, findUrlParameter } from '../shared';

export const FETCH_COLLECTION_ITEMS = 'fetch_collection_items/fetch';
export const FETCH_COLLECTION_ITEMS_SUCCESS =
  'fetch_collection_items/fetch_success';
export const FETCH_COLLECTION_ITEMS_FAIL = 'fetch_collection_items/fetch_fail';

const initialState = {
  fetchObjects: [],
  items: [],
  nextUrl: '',
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  let isFirstSet;
  switch (action.type) {
    case FETCH_COLLECTION_ITEMS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_COLLECTION_ITEMS_SUCCESS:
      isFirstSet = action.payload.index === 0;
      return {
        ...state,
        isLoading: false,
        fetchObjects: isFirstSet
          ? [action.payload.data]
          : state.fetchObjects.concat(action.payload.data),
        items: isFirstSet
          ? action.payload.data.objects
          : state.items.concat(action.payload.data.objects),
        nextUrl: action.payload.data.next,
        errMsg: ''
      };
    case FETCH_COLLECTION_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchCollectionItems = url => dispatch => {
  dispatch({
    type: FETCH_COLLECTION_ITEMS
  });
  fetchJson(url)
    .then(data => {
      dispatch({
        type: FETCH_COLLECTION_ITEMS_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_COLLECTION_ITEMS_FAIL,
        payload: error
      });
    });
};
