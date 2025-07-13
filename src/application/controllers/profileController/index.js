import getProfile from "./getProfile.js";
import updateProfile from "./updateProfile.js";
import uploadProfilePicture from "./uploadProfilePicture.js";
// import createProfile from "./createProfile.js";

class ProfileController {
  getProfile = getProfile;
  updateProfile = updateProfile;
  uploadProfilePicture = uploadProfilePicture;
  // createProfile = createProfile;
}

export default ProfileController;
