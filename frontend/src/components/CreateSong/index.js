import './CreateSong.css';
import SongForm from '../SongForm';

const CreateSong = () => {
  const song = {
    id,
    title,
    description,
    url,
    imageUrl,
    albumId
  };

  return (
    <SongForm song={song} formType="Create Song" />
  );
}

export default CreateSong;
