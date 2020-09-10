import * as types from './types';

export const setQuery = (payload) => ({
  type: types.SET_QUERY,
  payload
})

export const setJsonData = (payload) => ({
  type: types.SET_JSON_DATA,
  payload,
});

export const setMatchPaths = (payload) => ({
  type: types.SET_MATCH_PATHS,
  payload
})
