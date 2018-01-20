import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_ITEM_DETAILS = 'fetch_item_details/fetch';
export const FETCH_ITEM_DETAILS_SUCCESS = 'fetch_item_details/fetch_success';
export const FETCH_ITEM_DETAILS_FAIL = 'fetch_item_details/fetch_fail';

const initialState = {
  fetchObject: null,
  id: '',
  name: '',
  description: '',
  links: '',
  isLoading: false,
  format: '',
  creation: '',
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_ITEM_DETAILS:
      return {
        ...state,
        isLoading: true,
        errMsg: ''
      };
    case FETCH_ITEM_DETAILS_SUCCESS:
      return {
        ...state,
        fetchObject: payload,
        id: payload.id,
        name: payload.title,
        description: payload.description,
        links: payload.links,
        format: payload.format,
        creation: payload.creation,
        isLoading: false
      };
    case FETCH_ITEM_DETAILS_FAIL:
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
export const fetchItemDetails = id => dispatch => {
  dispatch({
    type: FETCH_ITEM_DETAILS
  });

  fetchJson(`${DENSHO_REST_BASE_URL}${id}/`)
    .then(json => {
      dispatch({
        type: FETCH_ITEM_DETAILS_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_ITEM_DETAILS_FAIL,
        payload: error
      });
    });
};
