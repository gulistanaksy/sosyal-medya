import addPost from "./addPost.js";
import getPostById from "./getPostById.js"
import updatePost from "./updatePost.js";
// import getMyPosts from "./getMyPosts.js";
// import getPostsByProfile from "./getPostsByProfile.js";

class PostController {
  addPost = addPost;
  getPostById = getPostById;
  updatePost = updatePost;
//   getMyPosts = getMyPosts;
//   getPostsByProfile = getPostsByProfile;
}

export default PostController;
