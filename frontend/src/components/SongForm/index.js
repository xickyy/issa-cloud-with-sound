import "./SongForm.css"

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newSong } from '../../store/songs';
import { getAlbums } from '../../store/albums';
import { editSong } from '../../store/songs';
import { useParams } from 'react-router-dom';
import { getSongData } from '../../store/songs';


const SongForm = () => {
  const { songId } = useParams();
  const songs = useSelector((state) => state.songs.songs)
  const history = useHistory();
  const [title, setTitle] = useState((songId && songs?.title) || '');
  const [description, setDescription] = useState((songId && songs?.description) || '');
  const [url, setUrl] = useState((songId && songs?.url) || '');
  const [imageUrl, setImageUrl] = useState((songId && songs?.imageUrl) || '');
  const [albumId, setAlbumId] = useState((songId && songs?.albumId) || 'Please select an album')
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    if (songId) {
      setErrors([]);
      e.preventDefault();
      const songEdit = await dispatch(editSong(songId, title, description, url, imageUrl, albumId))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      if (songEdit) {
        history.push(`/songs/${songEdit.id}`)
      }
    } else {
      setErrors([]);
      e.preventDefault();
      const song = await dispatch(newSong(title, description, url, imageUrl, albumId))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      if (song) {
        history.push(`/songs/${song.id}`)
      }
    }

  };



  useEffect(() => {
    let fetchALBUMS = async () => {
      await dispatch(getAlbums())
    }
    fetchALBUMS()

    let fetchSONGS = async () => {
      if (songId) {
        await dispatch(getSongData(songId))
      }
    }
    fetchSONGS()

  }, [dispatch, songId])


  const ALBUMS = useSelector(state => state.albums.albums)




  return (
    <form onSubmit={handleSubmit} >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h2>Add a Song</h2>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      <label>
        Url
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </label>

      <label>
        Image Url
        <input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
      </label>

      <label>
        Album
        <select value={albumId} onChange={e => setAlbumId(e.target.value)}>
          <option disabled>{'Please select an album'}</option>
          {ALBUMS && ALBUMS.map(album => (
            <option
              key={album.id}
              value={album.id}
            >
              {album.title}
            </option>
          ))}
        </select>

      </label>

      <button type='submit'>Submit</button>
    </form>
  )
}


export default SongForm;
