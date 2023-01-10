import { csrfFetch } from './csrf'

const SET_COMMENTS = 'comments/SET_COMMENTS'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"


export const setComments = (payload) => {
  return {
    type: SET_COMMENTS,
    payload
  }
}

export const createComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  }
}

export const deleteComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const getComments = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}/comments`)
  if (response.ok) {
    const comments = await response.json()
    dispatch(setComments(comments))
  }
  return response.ok
}

export const newComment = (id, body) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({
      body
    }
    )
  })
  if (response.ok) {
    const comment = await response.json()
    dispatch(createComment(comment))
    return comment
  }
  return response
}

export const deleteCommentById = (id) => async (dispatch) => {
  let response = await csrfFetch(`/api/comments/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteComment(id))
  }
}

export const editComment = (id, body) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      body
    })
  })
  if (response.ok) {
    const comment = await response.json()
    dispatch(createComment(comment))
    return comment
  }
  return response
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

    case ADD_COMMENT:
      newState.comments[action.payload.id] = action.payload
      return newState;

    case REMOVE_COMMENT:
      delete newState.comments[action.id]
      return newState;

    default:
      return state
  }
}

export default commentReducer;
