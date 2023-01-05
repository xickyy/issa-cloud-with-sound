import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongs } from '../../store/songs';


const ShowOneSong = () => {
  const { songId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    let fetchSONGS = async () => {
      await dispatch(getSongs())
    }
    fetchSONGS()
  }, [dispatch])

  let songsState = useSelector(state => state.songs)
  let selectedSong
  if (songsState.songs) {
    let SONGS = Object.values(songsState.songs.songs)
    selectedSong = SONGS.find(song => parseInt(songId) === song.id)
  }
  console.log(selectedSong);


  return (
    <div>{selectedSong && (
      <div>
        <h2>{selectedSong.title}</h2>
        <div>By: Artist Name</div>
        <div>Description: {selectedSong.description}</div>
        <div>{selectedSong.imageUrl}</div>
        <div>
          <button>Edit Song</button>
          <button>Delete Song</button>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
