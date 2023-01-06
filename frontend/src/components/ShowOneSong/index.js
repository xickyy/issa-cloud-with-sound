import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongs, getSongData } from '../../store/songs';
import SongForm from '../SongForm';


const ShowOneSong = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  const { songId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    let fetchDATA = async (songId) => {
      await dispatch(getSongData(songId)).then(() => setIsLoaded(true));
    }
    fetchDATA(songId)
  }, [dispatch])

  let songsState = useSelector(state => state.songs)
  let SONG
  if (isLoaded) {
   SONG = (songsState.songs)
  }




  return (
    <div>{SONG && (
      <div>
        <h2>{SONG.title}</h2>
        <div>By: {SONG.User.username}</div>
        <div>Description: {SONG.description} {}</div>
        <div>Album: {SONG.Album.title}</div>
        <div>Image: {SONG.imageUrl}</div>
        <div>
          <button>Edit Song</button>
          <button>Delete Song</button>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
