import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongData } from '../../store/songs';
import { deleteSongById } from '../../store/songs';
import { getComments } from '../../store/comments';
import CommentInput from '../CommentInput';



const ShowOneSong = () => {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const { songId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongData(songId))
    dispatch(getComments(songId)).then(() => setIsLoaded(true));

  }, [dispatch])

  let songsState = useSelector(state => state.songs)
  let commentsState = useSelector(state => state.comments)
  let userState = useSelector(state => state.session)
  let SONG
  let COMMENTS
  if (isLoaded) {
    SONG = (songsState.songs)
    COMMENTS = Object.values(commentsState.comments)
  }



  const deleter = () => {
    dispatch(deleteSongById(songId))
    history.push("/songs")
  }

  const userEditSong = () => {
    if(userState.user && userState.user.id === SONG.userId){
      return <button onClick={() => { history.push(`/songs/${songId}/edit`) }}>Edit Song</button>
    }
  }

  const userDeleteSong = () => {
    if(userState.user && userState.user.id === SONG.userId) {
      return <button onClick={() => { deleter() }}>Delete Song</button>
    }
  }





  return (
    <div>{SONG && (
      <div>
        <h2>Title: {SONG.title}</h2>
        <div>By: {SONG.User.username}</div>
        <div>Song Description: {SONG.description} { }</div>
        <div>Album Title: {SONG.Album.title}</div>
        <div>Album Description: {SONG.Album.description} { }</div>
        <div>Album Image: {SONG.imageUrl}</div>
        <div>
          {userEditSong()}
          {userDeleteSong()}
        </div>
        <div>
          <h3>Comments-</h3>
          <div>{<CommentInput />}</div>
          <button>Create Comment</button>
          <div>{COMMENTS && COMMENTS.map((comment) => {
            return (
              <div key={comment.id}>
                <div>{comment.body}</div>
                <button>Edit Comment</button>
                <button>Delete Comment</button>
              </div>
            )
          })}</div>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
