import './Songs.css';

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';




const ShowSongs = () => {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)


  useEffect(() => {
    let fetchSONGS = async () => {
      await dispatch(getSongs(page)).then(() => setIsLoaded(true));
    }
    fetchSONGS()
  }, [dispatch, page])

  let songsState = useSelector(state => state.songs)
  let SONGS
  if (isLoaded) {
    SONGS = songsState.songs.songs
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
      {SONGS && SONGS.map((song) => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <div>{'By: artist name'}</div>
          <Link key={song.id} to={`/songs/${song.id}`}>{'Song Details'}</Link>

        </div>))}
      <button onClick={() => handlePageMinus()}>Previous Page</button>
      <div>Page:{page}</div>
      <button onClick={() => handlePagePlus()}>Next Page</button>
    </div>
  );


}

export default ShowSongs;
