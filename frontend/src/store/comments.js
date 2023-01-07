import { csrfFetch } from './csrf'

const SET_COMMENTS = 'comments/SET_COMMENTS'


export const setComments = (payload) => {
  return {
    type: SET_COMMENTS,
    payload
  }
}

export const getComments = (id, body) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}/comments`)
  if (response.ok) {
    const comments = await response.json()
    dispatch(setComments(comments))
  }
  return response.ok
}

const initialState = () => {
  const commentsObj = {};
  return commentsObj
}


const commentReducer = (state = initialState(), action) => {
  const newState = { ...state }
  switch (action.type) {
    case SET_COMMENTS:
      newState.comments = {}
      action.payload.forEach(comment => newState.comments[comment.id] = comment)
      return newState;

    default:
      return state
  }
}

export default commentReducer;
