import React from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileCard from "./ProfileCard";
import { getAthleteById, putAthleteById } from "../../services/athlete.service";
import { getClassYear } from "./AddSportHistory/AddSportService";
import "./Profile.css";
import ProfileBio from "./ProfileBio";
import AthleteHistoryCarouselFinal from "./AthleteHistoryCarouselFinal";
import { connect } from "react-redux";
import AthleteAcademics from "./AthleteAcademics";
import { followUser, selectFollowingById, unfollowUser } from "../../services/follow.service";
import { highlightUser, unhighlightUser, selectHighlightById } from "../../services/highlight.service";
import { getProfilePic } from "./ProfileServer";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";

class ProfileContainer extends React.Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    city: "",
    state: "",
    bio: "",
    profilePic: "",
    classYear: "",
    classYearId: 1,
    gradYear: "",
    sportLevel: "",
    sportPosition: "",
    height: null,
    heightFeet: null,
    heightInches: null,
    weight: null,
    gpa: null,
    sat: null,
    act: null,
    academicNotes: "",
    targetSport: "",
    targetPosition: "",
    sport: "",
    stats: "",
    schoolName: " High School",
    schoolId: 0,
    title: "",
    classYearOptions: [],
    id: null,
    userId: null,
    following: false,
    highlighting: false,
    everyThing: {},
    pLoader: null,
    showMessageButton: false,
    verification: []
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  grabAcademicInfo = (gpa, sat, act, academicNotes) => {
    this.setState(
      {
        gpa,
        sat,
        act,
        academicNotes
      },
      () => this.handleSaveProfile()
    );
  };

  handleProfileInfoSubmit = profInfo => {
    this.setState(
      {
        firstName: profInfo.FirstName,
        middleName: profInfo.MiddleName,
        lastName: profInfo.LastName,
        schoolName: profInfo.SchoolName,
        schoolId: parseInt(profInfo.SchoolId),
        city: profInfo.City,
        state: profInfo.State,
        classYearId: profInfo.ClassYearId,
        gradYear: profInfo.HighSchoolGraduationYear,
        height: profInfo.Height,
        heightFeet: profInfo.heightFeet,
        heightInches: profInfo.heightInches,
        weight: profInfo.Weight
      },
      () => this.handleSaveProfile()
    );
    console.log("submit", profInfo);
  };

  updateProfilePic = id => {
    getProfilePic(id).then(res => {
      console.log(res);
      let newPic = res.data.resultSets[0][0].AvatarUrl;
      this.setState({
        profilePic: newPic
      });
    });
  };

  componentDidMount() {
    this.setState({
      pLoader: true
    });

    selectFollowingById(this.props.currentUser.id).then(res => {
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].UserId == this.props.match.params.id) {
            this.setState({ following: true });
          }
        }
      }
    });

    selectHighlightById(this.props.match.params.id).then(res => {
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].HighlightId == this.props.currentUser.id) {
            this.setState({ highlighting: true });
          }
        }
      }
    });

    getClassYear().then(res => this.setState({ classYearOptions: res.data.item.pagedItems }));
    this.getAthleteCall();
  }

  getAthleteCall = () => {
    getAthleteById(this.props.match.params.id).then(response => {
      //console.log("info", response);
      const info = response.data.item.athletes[0];
      const sportPositions = [];
      const heightFeet = Math.floor(info.Height / 12);
      const heightInches = info.Height % 12;
      info.heightFeet = heightFeet;
      info.heightInches = heightInches;

      this.setState(
        {
          everyThing: info,
          firstName: info.FirstName,
          middleName: info.MiddleName,
          lastName: info.LastName,
          city: info.City,
          state: info.State,
          bio: info.ShortBio,
          profilePic: info.AvatarUrl,
          gradYear: info.HighSchoolGraduationYear,
          sportLevel: info.CompetitionLevel,
          sportPosition: sportPositions,
          sport: info.SportName,
          classYear: info.ClassYearName,
          classYearId: info.ClassYearId,
          schoolName: info.SchoolName,
          schoolId: info.SchoolId,
          height: info.Height,
          heightFeet: heightFeet,
          heightInches: heightInches,
          weight: info.Weight,
          sat: info.SAT,
          gpa: info.GPA,
          act: info.ACT,
          academicNotes: info.AcademicNotes,
          id: info.Id,
          userId: info.UserId
        },
        () => {
          this.setState({
            pLoader: false
          });
        }
      );
    });
  };

  handleSaveProfile = () => {
    let height = Number(this.state.heightFeet) * 12;
    height = height + Number(this.state.heightInches);
    const payload = {
      id: this.state.id,
      userId: this.state.userId,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      schoolId: this.state.schoolId,
      classYearId: this.state.classYearId,
      highSchoolGraduationYear: this.state.gradYear,
      city: this.state.city,
      state: this.state.state,
      height: height,
      weight: this.state.weight,
      shortBio: this.state.bio,
      sat: this.state.sat,
      act: this.state.act,
      gpa: this.state.gpa,
      academicNotes: this.state.academicNotes
    };
    putAthleteById(payload).then(res => {});
  };

  handleEditBio = bio => {
    this.setState(
      {
        bio: bio
      },
      () => this.handleSaveProfile()
    );
  };

  onHandleSchoolSelect = id => {
    this.setState({
      schoolId: id
    });
  };

  followUser = () => {
    const payload = {
      followerId: this.props.currentUser.id,
      userId: parseInt(this.props.match.params.id),
      userNotified: false
    };
    if (!this.state.following) {
      followUser(payload).then(res => {
        this.setState({ following: true });
      });
    } else {
      unfollowUser(this.props.currentUser.id, this.props.match.params.id).then(res => {
        this.setState({ following: false });
      });
    }
  };

  highlightUser = () => {
    const payload = {
      highlightId: this.props.currentUser.id,
      userId: parseInt(this.props.match.params.id)
    };
    if (!this.state.highlighting) {
      highlightUser(payload).then(res => {
        this.setState({ highlighting: true });
      });
    } else {
      unhighlightUser(this.props.currentUser.id, this.props.match.params.id).then(res => {
        this.setState({ highlighting: false });
      });
    }
  };

  render() {
    const currentPageId = this.props.match.params.id;
    return (
      <div className="app-wrapper">
        <div className="row justify-content-center">
          <div className="col-11 col-md-10 col-lg-9 col-xl-7 p-0">
            <div className="card">
              <img
                src="http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,h_240,w_950/v1533612434/new.jpg"
                className="profile-banner-img img-fluid"
              />
              <div className="px-2 py-3 col-12 rs-athlete-tag">
                <ProgressIndicator loader={this.state.pLoader} />
                <ProfileBanner
                  everyThing={this.state.everyThing}
                  highlightUser={this.highlightUser}
                  highlighting={this.state.highlighting}
                  following={this.state.following}
                  followUser={this.followUser}
                  currentProfile={this.props.match.params.id}
                  currentUser={this.props.currentUser}
                  onChange={this.onChange}
                  handleChange={this.handleChange}
                  handleSaveProfile={this.handleSaveProfile}
                  onHandleSchoolSelect={this.onHandleSchoolSelect}
                  updateProfilePic={this.updateProfilePic}
                  handleProfileInfoSubmit={this.handleProfileInfoSubmit}
                  profilePic={this.state.profilePic}
                  classYearOptions={this.state.classYearOptions}
                  currentPageId={currentPageId}
                  verification={this.getVerified}
                />
              </div>
            </div>

            <div>
              <div className="jr-card rs-athlete-tag pt-3" id="bio">
                <ProfileBio
                  popover="bio"
                  handleChange={this.handleChange}
                  bio={this.state.bio}
                  handleEditBio={this.handleEditBio}
                  currentPageId={currentPageId}
                />
              </div>
            </div>

            <div className="row px-3">
              <div className="col-md-7 col-sm-12 pl-0 pr-0 pr-md-2">
                <div className="jr-card pb-0 pt-3">
                  <AthleteHistoryCarouselFinal currentPageId={currentPageId} />
                </div>
              </div>
              <div className="col-md-5 col-sm-12 pr-0 pl-0 pl-md-3 mt-4 mt-md-0">
                <div className="jr-card pt-3" id="academics">
                  <AthleteAcademics
                    popover="academics"
                    grabAcademicInfo={this.grabAcademicInfo}
                    sat={this.state.sat}
                    act={this.state.act}
                    gpa={this.state.gpa}
                    academicNotes={this.state.academicNotes}
                    handleChange={this.handleChange}
                    handleSaveProfile={this.handleSaveProfile}
                    currentPageId={currentPageId}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ProfileCard
                handleChange={this.handleChange}
                gpa={this.state.gpa}
                sat={this.state.sat}
                act={this.state.act}
                desiredMajor={this.state.desiredMajor}
                stats={this.state.stats}
                handleSaveProfile={this.handleSaveProfile}
                userProfile={this.props.match.params.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(ProfileContainer);
