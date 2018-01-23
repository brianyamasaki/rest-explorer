import { fetchJson, DENSHO_REST_BASE_URL } from '../shared';

export const FETCH_INTERVIEW_SEGMENT = 'fetch_interview_segments/fetch';
export const FETCH_INTERVIEW_SEGMENT_SUCCESS =
  'fetch_interview_segments/fetch_success';
export const FETCH_INTERVIEW_SEGMENT_FAIL =
  'fetch_interview_segments/fetch_fail';
export const FETCH_INTERVIEW_FILES_SUCCESS =
  'fetch_interview_segments/fetch_files_success';

const initialState = {
  fetchObject: '',
  id: '',
  name: '',
  description: '',
  credit: '',
  links: '',
  isLoading: false,
  files: [],
  errMsg: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERVIEW_SEGMENT:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_INTERVIEW_SEGMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchObject: action.payload,
        id: action.payload.id,
        name: action.payload.title,
        description: action.payload.description,
        credit: action.payload.credit,
        links: action.payload.links,
        errMsg: ''
      };
    case FETCH_INTERVIEW_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload.objects,
        transcript: action.payload.objects.find(
          item => item.role === 'transcript'
        ),
        mpeg: action.payload.objects.find(
          item => item.mimetype === 'video/mpeg2'
        )
      };
    case FETCH_INTERVIEW_SEGMENT_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// actions

export const fetchInterviewSegment = id => dispatch => {
  dispatch({
    type: FETCH_INTERVIEW_SEGMENT
  });
  const url = `${DENSHO_REST_BASE_URL}${id}/`;
  fetchJson(url)
    .then(data => {
      const urlChildrenFiles = data.links['children-files'];
      if (urlChildrenFiles) {
        fetchJson(urlChildrenFiles).then(filesData => {
          dispatch({
            type: FETCH_INTERVIEW_FILES_SUCCESS,
            payload: filesData
          });
        });
      }
      dispatch({
        type: FETCH_INTERVIEW_SEGMENT_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_INTERVIEW_SEGMENT_FAIL,
        payload: error
      });
    });
};
