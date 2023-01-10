import "./DisplayComment.css"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCommentById } from "../../store/comments"
import { editComment } from "../../store/comments"


const DisplayComment = ({ comment, SONG }) => {

  const [commentBoolean, setCommentBoolean] = useState(false)
  const [commentBody, setCommentBody] = useState(comment.body)
  const dispatch = useDispatch();
  const history = useHistory()
  let userState = useSelector(state => state.session)

  const commentDeleter = (id) => {
    dispatch(deleteCommentById(id))
  }

  const userDeleteComment = (userId, commentId) => {
    if (userState.user && userState.user.id === userId) {
      return <button onClick={() => { commentDeleter(commentId) }}>Delete Comment</button>
    }
  }

  const userEditComment = (userId) => {
    if (userState.user && userState.user.id === userId) {
      return <button onClick={() => booleanChanger()}>Edit Comment</button>
    }
  }

  const booleanChanger = () => {
    if (commentBoolean) {
      setCommentBoolean(false)
    } else {
      setCommentBoolean(true)
    }
  }

  const handleSubmit = async (e) => {
    booleanChanger()
    e.preventDefault();
    const commentEdit = await dispatch(editComment(comment.id, commentBody));
    if (commentEdit) {
      history.push(`/songs/${commentEdit.songId}`)
    }
  }

  const commentEditor = () => {
    if (commentBoolean) {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Edit Comment
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      )
    }
  }

  return (
    <div key={comment.id}>
      <div>
        {SONG.User.username}: {comment.body}
      </div>
      <div>
        {userEditComment(comment.userId)}
        {userDeleteComment(comment.userId, comment.id)}
        <div>
          {commentEditor()}
        </div>
      </div>
    </div>
  )
}

export default DisplayComment;
