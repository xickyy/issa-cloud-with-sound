import "./ShowOneSong.css"

import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongData } from '../../store/songs';
import { deleteSongById } from '../../store/songs';
import { getComments } from '../../store/comments';
import CommentInput from '../CommentInput';
import DisplayComment from '../DisplayComment';


const ShowOneSong = () => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const { songId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongData(songId))
    dispatch(getComments(songId)).then(() => setIsLoaded(true));

  }, [dispatch, songId])

  let songsState = useSelector(state => state.songs)
  let commentsState = useSelector(state => state.comments)
  let userState = useSelector(state => state.session)
  let SONG
  let COMMENTS
  if (isLoaded) {
    SONG = (songsState.songs)
    COMMENTS = Object.values(commentsState.comments)
  }


  const songDeleter = () => {
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
      return <button onClick={() => { songDeleter() }}>Delete Song</button>
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
        <div id='albumCover'>
        <img id='image' src={SONG.Album.imageUrl} class='Image' alt=''/>
        </div>
        <div>
          {userEditSong()}
          {userDeleteSong()}
        </div>
        <div>
          <h3>Comments-</h3>
          <div>{<CommentInput />}</div>
          <div>{COMMENTS && COMMENTS.map((comment) => {
            return (
              <div key={comment.id}>{<DisplayComment comment={comment} SONG ={SONG}/>}</div>
            )
          })}</div>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
