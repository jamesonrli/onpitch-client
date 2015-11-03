var Profile = function(userId, firstName, lastName, profileId, imageURL, headline) {
  this.userId = userId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.profileId = profileId;
  this.imageURL = imageURL;
  this.headline = headline;
};

module.exports = Profile;
