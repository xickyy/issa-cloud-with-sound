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
  const {songId} = useParams();
  const songs = useSelector((state) => state.songs.songs)
  const history = useHistory();
  const [title, setTitle] = useState(songs?.title || '');
  const [description, setDescription] = useState(songs?.description || '');
  const [url, setUrl] = useState(songs?.url || '');
  const [imageUrl, setImageUrl] = useState(songs?.imageUrl || '');
  const [albumId, setAlbumId] = useState(songs?.albumId || 'Please select an album')
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    if(songId) {
      e.preventDefault();
      const songEdit = await dispatch(editSong(songId, title, description, url, imageUrl, albumId));
      if (songEdit) {
        history.push(`/songs/${songEdit.id}`)
      }
    } else {
      e.preventDefault();
      const song = await dispatch(newSong(title, description, url, imageUrl, albumId));
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
    dispatch(getSongData(songId))

  },[dispatch])


  const ALBUMS = useSelector(state => state.albums.albums)




    return (
      <form onSubmit={handleSubmit} >
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

        <input type="submit"  />
      </form>
    )
  }


export default SongForm;
