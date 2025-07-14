import addComment from "./addComment.js";
import updateComment from "./updateComment.js";
// gelecekte getCommentByPost vs eklenebilir

class CommentController {
  addComment = addComment;
  updateComment = updateComment;
}

export default CommentController;
