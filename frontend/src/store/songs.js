

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
