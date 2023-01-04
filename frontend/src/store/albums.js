import {csrfFetch} from './csrf'

const SET_ALBUMS = 'albums/SET_ALBUMS'


export const setAlbums = (payload) => {
  return {
    type: SET_ALBUMS,
    payload
  }
}

export const getAlbums = () => async (dispatch) => {
  const response = await csrfFetch('/api/albums')
  if (response.ok) {
    const albums = await response.json()
    dispatch(setAlbums(albums))
  }
  return response.ok
}

const initialState = () => {
  const songsObj = {};
  return songsObj
}


const albumReducer = (state = initialState(), action) => {
  const newState = {...state}
  switch (action.type) {
    case SET_ALBUMS:
      newState.albums = action.payload
      return newState;

    default:
      return state
  }
}

export default albumReducer;
