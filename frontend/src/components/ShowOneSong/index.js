import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongData } from '../../store/songs';
import { deleteSongById } from '../../store/songs';



const ShowOneSong = () => {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const { songId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongData(songId)).then(() => setIsLoaded(true));

  }, [dispatch])

  let songsState = useSelector(state => state.songs)
  let SONG
  if (isLoaded) {
    SONG = (songsState.songs)
  }

  const deleter = () => {
    dispatch(deleteSongById(songId))
    history.push("/songs")
  }





  return (
    <div>{SONG && (
      <div>
        <h2>{SONG.title}</h2>
        <div>By: {SONG.User.username}</div>
        <div>Song Description: {SONG.description} { }</div>
        <div>Album Title: {SONG.Album.title}</div>
        <div>Album Description: {SONG.Album.description} { }</div>
        <div>Album Image: {SONG.imageUrl}</div>
        <div>
          <button onClick={() => { history.push(`/songs/${songId}/edit`) }}>Edit Song</button>
          <button onClick={() => {deleter()}}>Delete Song</button>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
