import {csrfFetch} from './csrf'

const ADD_SONG = 'songs/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'


export const createSong = (payload) => {
  return {
    type: ADD_SONG,
    payload
  }
}

export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  }
}




const initialState = () => {
  const songsObj = {};
  return songsObj
}


export const newSong = (title, description, url, imageUrl, albumId) => async (dispatch) => {
  console.log('initiating thunk')
  const response = await csrfFetch('/api/songs', {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      url,
      imageUrl,
      albumId
    })
  })
  if (response.ok) {
    const song = await response.json()
    console.log('hit backend', dispatch)
    dispatch(createSong(song))
    return song
  }
  return response
}





const songReducer = (state = initialState(), action) => {
  const newState = {...state}
  switch (action.type) {
    case ADD_SONG:
      newState[action.payload.id] = action.payload
      return newState;

    case DELETE_SONG:
      delete newState[action.id]
      return newState;

    default:
      return state
  }
}


export default songReducer;
