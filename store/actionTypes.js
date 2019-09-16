const actionTypes = [
  'FIND_MOVIES',
  'GET_ARTICLE',
  'GET_ARTICLES',
  'GET_CURRENT_USER',
  'GET_MOVIES',
  'GET_USERS',
  'SAVE_ARTICLE',
].reduce((acc, actionType) => ({
  ...acc,
  [actionType]: actionType,
}), {})





export default actionTypes