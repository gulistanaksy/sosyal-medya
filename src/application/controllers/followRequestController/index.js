import addFollowRequest from "./addFollowRequest.js";
import updateFollowRequest from "./updateFollowRequest.js";
import getFollowRequest from "./getFollowRequest.js";
import cancelFollowRequest from "./cancelFollowRequest .js";
import unfollow from "./unfollow.js"

class FollowRequestController {
  addFollowRequest = addFollowRequest;
  updateFollowRequest = updateFollowRequest;
  getFollowRequest = getFollowRequest;
  cancelFollowRequest = cancelFollowRequest
  unfollow = unfollow 
}

export default FollowRequestController;
