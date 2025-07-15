import getProfile from "./getProfile.js";
import updateProfile from "./updateProfile.js";
import uploadProfilePicture from "./uploadProfilePicture.js";
import getProfileById from "./getProfileById.js";
import getFollowers from "./getFollowers.js";
import getFollowing from "./getFollowing.js";

// import createProfile from "./createProfile.js";

class ProfileController {
  getProfile = getProfile;
  getProfileById = getProfileById;
  updateProfile = updateProfile;
  uploadProfilePicture = uploadProfilePicture;
  getFollowers = getFollowers;
  getFollowing = getFollowing;
  // createProfile = createProfile;
}

export default ProfileController;
