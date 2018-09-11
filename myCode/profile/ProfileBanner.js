import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCarousel from "./ProfileCarousel";
import IconButtonGroup from "./IconButtonGroup";
import ProfileBio from "./ProfileBio";
import AddTargetSport from "./AddTargetSport";
import AddTargetSportCarousel from "./AddTargetSportCarousel";
import ProfilePicture from "./ProfilePicture";

/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileBanner extends React.Component {
  render() {
    return (
      <div className="container profileInfoContainer parent">
        <div className="row profileInfo ">
          <div className="col-md-3 px-0 ">
            <div className="row">
              <div className="col-md-12">
                <ProfilePicture
                  profilePic={this.props.profilePic}
                  currentUser={this.props.currentUser}
                  currentProfile={this.props.currentProfile}
                  updateProfilePic={this.props.updateProfilePic}
                />
              </div>
            </div>
            <div className="row mb-0 pb-0">
              <div className="col-md-12">
                <AddTargetSportCarousel currentPageId={this.props.currentPageId} />
              </div>
            </div>
          </div>
          <div className="col-md-9 profileInfo-info pl-2 ">
            <ProfileInfo
              everyThing={this.props.everyThing}
              highlighting={this.props.highlighting}
              highlightUser={this.props.highlightUser}
              following={this.props.following}
              followUser={this.props.followUser}
              handleChange={this.props.handleChange}
              currentProfile={this.props.currentProfile}
              userId={this.props.userId}
              handleProfileInfoSubmit={this.props.handleProfileInfoSubmit}
              classYearOptions={this.props.classYearOptions}
              currentPageId={this.props.currentPageId}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileBanner;
