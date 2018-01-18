import { fetchJson } from '../shared';

export const FETCH_CHILDREN = 'fetch_children/fetch';
export const FETCH_CHILDREN_SUCCESS = 'fetch_children/fetch_success';
export const FETCH_CHILDREN_FAIL = 'fetch_children/fetch_fail';

const initialState = {
  children: null,
  isLoading: false
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHILDREN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CHILDREN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        children: action.payload
      };
    case FETCH_CHILDREN_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchChildren = url => dispatch => {
  dispatch({
    type: FETCH_CHILDREN
  });
  fetchJson(url)
    .then(json => {
      dispatch({
        type: FETCH_CHILDREN_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_CHILDREN_FAIL,
        payload: error
      });
    });
};
