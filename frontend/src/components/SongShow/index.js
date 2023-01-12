import './Songs.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';




const ShowSongs = () => {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)


  useEffect(() => {
    dispatch(getSongs(page)).then(() => setIsLoaded(true));

  }, [dispatch, page])

  let songsState = useSelector(state => state.songs)
  let SONGS
  if (isLoaded) {
    SONGS = Object.values(songsState.songs)
  }


  const handlePagePlus = () => {
    setPage(page + 1);
  }

  const handlePageMinus = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  }


  return (
    <div>

      <div id='songPage'>
        {SONGS && SONGS.map((song) => (
          <div id='songDisplay' key={song.id}>
            <h2>{song.title}</h2>
            <div id='songDetails'>
              <div id='albumCoverDisplay'>
                <img src={song.Album.imageUrl} className='Image' alt='' />
              </div>
              <div>By: {song.User.username}</div>
              <Link key={song.id} to={`/songs/${song.id}`}>{'Song Details'}</Link>
            </div>
          </div>
        ))}
      </div>

      <div id='paginationButtons'>
        <button id='singleButton' onClick={() => handlePageMinus()}>Previous Page</button>
        <div>Page:{page}</div>
        <button id='singleButton' onClick={() => handlePagePlus()}>Next Page</button>
      </div>

    </div>
  );


}

export default ShowSongs;
