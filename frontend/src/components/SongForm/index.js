import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSong, newSong } from '../../store/songs';
import { getAlbums } from '../../store/albums';

const SongForm = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState('Please select an album')
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const song = await dispatch(newSong(title, description, url, imageUrl, albumId));
    console.log('hit new song', song)
    if (song) {
        history.push(`/songs/${song.id}`)
    }

  };


  useEffect(() => {
    let fetchALBUMS = async () => {
      await dispatch(getAlbums())
    }
    fetchALBUMS()
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
