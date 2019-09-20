const actionTypes = [
  'FIND_MOVIES',
  'GET_ARTICLE',
  'GET_ARTICLES',
  'GET_CURRENT_USER',
  'GET_MOVIES',
  'GET_USERS',
  'UPDATE_CHARACTERS',
  'SAVE_ARTICLE',
].reduce((acc, actionType) => ({
  ...acc,
  [actionType]: actionType,
}), {})





export default actionTypes
