import { fetchJson, PAGING_OFFSET_STRING, findUrlParameter } from '../shared';

export const FETCH_INTERVIEW_CHILDREN = 'fetch_interview_items/fetch';
export const FETCH_INTERVIEW_CHILDREN_SUCCESS =
  'fetch_interview_items/fetch_success';
export const FETCH_INTERVIEW_CHILDREN_FAIL = 'fetch_interview_items/fetch_fail';

const initialState = {
  fetchObjects: [],
  segments: [],
  nextUrl: '',
  isLoading: false,
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  let isFirstSet;
  switch (action.type) {
    case FETCH_INTERVIEW_CHILDREN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_INTERVIEW_CHILDREN_SUCCESS:
      isFirstSet = action.payload.index === 0;
      return {
        ...state,
        isLoading: false,
        fetchObjects: isFirstSet
          ? [action.payload.data]
          : state.fetchObjects.concat(action.payload.data),
        segments: isFirstSet
          ? action.payload.data.objects
          : state.children.concat(action.payload.data.objects),
        nextUrl: action.payload.data.next,
        errMsg: ''
      };
    case FETCH_INTERVIEW_CHILDREN_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions
export const fetchInterviewChildren = url => dispatch => {
  dispatch({
    type: FETCH_INTERVIEW_CHILDREN
  });
  fetchJson(url)
    .then(data => {
      dispatch({
        type: FETCH_INTERVIEW_CHILDREN_SUCCESS,
        payload: {
          index: findUrlParameter(url, PAGING_OFFSET_STRING),
          data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_INTERVIEW_CHILDREN_FAIL,
        payload: error
      });
    });
};
