import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getSongData } from '../../store/songs';
import { deleteSongById } from '../../store/songs';
import { getComments } from '../../store/comments';
import CommentInput from '../CommentInput';
import { deleteCommentById } from '../../store/comments';
import { editComment } from '../../store/comments';



const ShowOneSong = () => {
  const history = useHistory();
  const comments = useSelector((state) => state.comments)
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentBody, setCommentBody] = useState('')
  const [commentBoolean, setCommentBoolean] = useState(false)
  console.log(comments)

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

  const handleSubmit = async (e) => {
    booleanChanger()
      e.preventDefault();
      const commentEdit = await dispatch(editComment());
      if (commentEdit) {
        history.push(`/songs/${commentEdit.id}`)
      }
    }



  const songDeleter = () => {
    dispatch(deleteSongById(songId))
    history.push("/songs")
  }

  const commentDeleter = (id) => {
    dispatch(deleteCommentById(id))
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


  const userDeleteComment = (userId, commentId) => {
    if(userState.user && userState.user.id === userId) {
      return <button onClick={() => { commentDeleter(commentId) }}>Delete Comment</button>
    }
  }

  const booleanChanger = () => {
    if(commentBoolean) {
      setCommentBoolean(false)
    } else {
      setCommentBoolean(true)
    }
  }


  const commentEditor = (id, key, body) => {
    if (commentBoolean && id === key ) {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Edit Comment
            <textarea
              value={body}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      )
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
          <div>{COMMENTS && COMMENTS.map((comment) => {
            return (
              <div key={comment.id}>
                <div>{comment.body}</div>
                <button onClick={() => booleanChanger()}>Edit Comment</button>
                <div>{commentEditor(comment.id, comment.id, commentBody)}</div>
                {userDeleteComment(comment.userId, comment.id)}
              </div>
            )
          })}</div>
        </div>
      </div>
    )}</div>
  )

}

export default ShowOneSong;
