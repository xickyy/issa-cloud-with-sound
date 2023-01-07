import { csrfFetch } from './csrf'


const ADD_SONG = 'songs/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'
const SET_SONGS = 'songs/SET_SONGS'
const SONG_DETAILS = 'songs/SONG_DETAILS'


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


export const setSongs = (payload) => {
  return {
    type: SET_SONGS,
    payload
  }
}

export const setDetails = (payload) => {
  return {
    type: SONG_DETAILS,
    payload
  }
}


const initialState = () => {
  const songsObj = { page: 1, songs: {} };
  return songsObj
}


export const newSong = (title, description, url, imageUrl, albumId) => async (dispatch) => {
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
    dispatch(createSong(song))
    return song
  }
  return response
}


export const getSongs = (page) => async (dispatch) => {
  let response
  if (page) {
    response = await csrfFetch(`/api/songs?page=${page}`)
  } else {
    response = await csrfFetch(`/api/songs`)
  }
  if (response.ok) {
    const songs = await response.json()
    dispatch(setSongs(songs))
  }
  return response.ok
}

export const editSong = (id, title, description, url, imageUrl, albumId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`, {
    method: "PUT",
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
    dispatch(createSong(song))
    return song
  }
  return response
}



export const getSongData = (id) => async (dispatch) => {
  let response = await csrfFetch(`/api/songs/${id}`
  )

  if (response.ok) {
    const songData = await response.json()
    dispatch(setDetails(songData))
  }
  return response.ok
}

export const deleteSongById = (id) => async (dispatch) => {
  let response = await csrfFetch(`/api/songs/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteSong(id))
  }
}






const songReducer = (state = initialState(), action) => {
  const newState = { ...state }
  switch (action.type) {
    case ADD_SONG:
      newState[action.payload.id] = action.payload
      return newState;

    case DELETE_SONG:
      delete newState[action.id]
      return newState;

    case SET_SONGS:
      delete newState.songs
      newState.songs = {}
      action.payload.songs.forEach(song => newState.songs[song.id] = song)
      newState.page = action.payload.page
      return newState;

    case SONG_DETAILS:
      newState.songs = action.payload
      return newState

    default:
      return state
  }
}


export default songReducer;
