import addComment from "./addComment.js";
import updateComment from "./updateComment.js";
import deleteComment from "./deleteComment.js"
import getCommentsByPostId from "./getCommentsByPostId.js"
// gelecekte getCommentByPost vs eklenebilir

class CommentController {
  addComment = addComment;
  updateComment = updateComment;
  deleteComment = deleteComment;
  getCommentsByPostId = getCommentsByPostId;
}

export default CommentController;
