import * as types from './types';

const initialState = {
  query: '',
  matchPaths: {},
  jsonData: {},
};

const reducer =  (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case types.SET_MATCH_PATHS:
      return {
        ...state,
        matchPaths: action.payload,
      };
    case types.SET_JSON_DATA:
      return {
        ...state,
        jsonData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
