import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_ITEM_DETAILS_ARRAY = 'fetch_item_details_array/fetch';
export const FETCH_ITEM_DETAILS_ARRAY_SUCCESS = 'fetch_item_details_array/fetch_success';
export const FETCH_ITEM_DETAILS_ARRAY_FAIL = 'fetch_item_details_array/fetch_fail';

const initialState = {
  fetchObjects: null,
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_ITEM_DETAILS_ARRAY:
      return {
        ...state,
        isLoading: true,
        errMsg: ''
      };
    case FETCH_ITEM_DETAILS_ARRAY_SUCCESS:
      const exhibits = payload.map(item => {
        const { id, collection_id, links, title, description, parent_id, credit } = item;
        return {
          id,
          collectionId: collection_id,
          imgSrc: links.img,
          title,
          description,
          credit,
          parentId: parent_id
        };
      });
      return {
        ...state,
        fetchObjects: payload,
        exhibits,
        isLoading: false
      };
    case FETCH_ITEM_DETAILS_ARRAY_FAIL:
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
export const fetchItemDetailsArray = ids => dispatch => {
  dispatch({
    type: FETCH_ITEM_DETAILS_ARRAY
  });
  
  const promises = ids.map(id => (
    fetchJson(`${DENSHO_REST_BASE_URL}${id}/`)
  ));

  Promise.all(promises)
    .then(json => {
      dispatch({
        type: FETCH_ITEM_DETAILS_ARRAY_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_ITEM_DETAILS_ARRAY_FAIL,
        payload: error
      });
    });
};
