import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSong } from '../../store/songs';

const SongForm = ({ song, formType }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState(song.albumId)
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    song = { ...song, title, description, url, imageUrl, albumId };
    dispatch(createSong(song))
    history.push(`/songs/${song.id}`)
  };


  return (
    <form onSubmit={handleSubmit} >
      <h2>{formType}</h2>

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
        Select an album
        <select value={albumId} onChange={e => setAlbumId(e.target.value)}>
          {ALBUMS.map(album => (
            <option
              key={albumId}
            >
              {albumId}
            </option>
          ))}
        </select>

      </label>

      <input type="submit" value={formType} />
    </form>
  )
}

export default SongForm;
