import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";
import "./Profile.css";
import AutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";
import {
  SaveProfileButton,
  CancelButton,
  MessageButton,
  StatsButton,
  HighlightButton,
  FollowButton,
  FollowOnButton,
  HighlightOnButton
} from "../CustomComponents/Button";
import AthleteProfilePopover from "../CustomComponents/Popover/AthleteProfilePopver";
import ProfileLinksModal from "./Modals/ProfileLinksModal";
import { connect } from "react-redux";
import FollowerModal from "./Modals/FollowerModal";
import { NavLink, withRouter } from "react-router-dom";
import { NotificationManager, NotificationContainer } from "react-notifications";
import { getContacts } from "../../services/message.service";
import { Tooltip } from "reactstrap";
import StateOptions from "../CustomComponents/InputsDropdowns/StateOptions";
import { Badge } from "reactstrap";
import { getAdvoListByAthleteId } from "../../services/advocate.service";
import VerifyListModal from "./Modals/VerifyListModal";
import HighlightListModal from "./Modals/HighlightListModal";

class ProfileInfo extends React.Component {
  state = {
    editMode: false,
    schoolName: "",
    linksModal: false,
    followerModal: false,
    highlightModal: false,
    everyThing: {},
    prevPropsEveryThing: {},
    showMessageButton: false,
    followerLength: 0,
    highlightLength: 0,
    showToolTip: false,
    verification: [],
    verifyModal: false
  };

  toggle = this.toggle.bind(this);

  static getDerivedStateFromProps(props, state) {
    if (props.everyThing !== state.prevPropsEveryThing || props.classYearOptions !== state.prevPropsClassYearOptions) {
      return {
        everyThing: props.everyThing,
        prevPropsEveryThing: props.everyThing,
        classYearOptions: props.classYearOptions,
        prevPropsClassYearOptions: props.classYearOptions
      };
    }
    return null;
  }

  componentDidMount = () => {
    this.handleGetContacts();
    this.getVerified();
  };

  getVerified = () => {
    getAdvoListByAthleteId(this.props.match.params.id).then(res => {
      console.log("PARENT VERIFY VALUE", res);
      this.setState({
        verification: res.data.item.pagedItems
      });
    });
  };

  grabFollowerLength = length => {
    this.setState({
      followerLength: length
    });
  };

  grabHighlightLength = length => {
    this.setState({
      highlightLength: length
    });
  };

  bundleProfileInfo = e => {
    e.preventDefault();
    const profileInfo = this.state.everyThing;
    this.props.handleProfileInfoSubmit(profileInfo);
    this.setState({
      editMode: false
    });
    NotificationManager.success("Profile Updated!", "Success", 2000);
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  saveProfile = () => {
    this.setState({
      editMode: false
    });
    this.props.handleSaveProfile();
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        [key]: val
      }
    }));
  };

  onChange = value => {
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        SchoolName: value
      }
    }));
  };

  onHandleSchoolSelect = id => {
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        SchoolId: id
      }
    }));
  };

  onEditCancelClick = () => {
    this.setState(
      {
        everyThing: this.state.prevPropsEveryThing
      },
      () => this.editField()
    );
  };

  toggleLinks = () => {
    this.setState({
      linksModal: !this.state.linksModal
    });
  };

  toggleFollowerModal = () => {
    this.setState({
      followerModal: !this.state.followerModal
    });
  };

  toggleHighlightModal = () => {
    this.setState({
      highlightModal: !this.state.highlightModal
    });
  };

  toggle() {
    this.setState({
      showToolTip: !this.state.showToolTip
    });
  }

  verifyModalToggle = () => {
    this.setState({
      VerifyListModal: !this.state.VerifyListModal
    });
  };

  verifyModalToggle = () => {
    this.setState({
      VerifyListModal: !this.state.VerifyListModal
    });
  };

  callback = () => {
    return schoolSearch(0, this.state.everyThing.SchoolName); // schoolSearch available in SchoolAdminServer.js
  };

  handleGetContacts = () => {
    const id = this.props.currentUser.id;
    getContacts(id)
      .then(response => {
        const user = response.data.items.contacts;
        if (user) {
          for (let i = 0; i < user.length; i++) {
            if (user[i]["UserId"] == this.props.currentPageId) {
              this.setState({ showMessageButton: true });
            }
          }
        }
      })
      .catch(() => {
        console.log("There was an error getting your contacts");
      });
  };

  render() {
    const { currentPageId } = this.props;
    const { showMessageButton, verification, showToolTip } = this.state;
    return (
      <div>
        <NotificationContainer />
        {!this.state.editMode ? (
          <React.Fragment>
            <div className="container profileInfo-info px-0">
              <div className="col-md-12 mr-2 mr-md-0">
                {this.state.everyThing.FirstName && (
                  <React.Fragment>
                    <div className="row align-items-center justify-content-end justify-content-md-between mb-4">
                      <div className="col-9 text-center text-md-left pl-0 pr-0">
                        <h1 style={{ fontWeight: 800 }} className="mb-0">
                          {this.state.everyThing.FirstName}
                          &nbsp;
                          {this.state.everyThing.MiddleName}
                          &nbsp;
                          {this.state.everyThing.LastName}
                        </h1>
                      </div>
                      {verification != null && verification[0].verify === true ? (
                        <React.Fragment>
                          <div
                            className="col-2 d-flex align-items-center pr-1 pointer"
                            style={{ color: "#388e3c" }}
                            onClick={this.verifyModalToggle}
                          >
                            <i className="zmdi zmdi-assignment-check zmdi-hc-lg" />
                            &nbsp;
                            <h3 className="mb-0">Verified</h3>
                          </div>
                          <VerifyListModal
                            data={verification}
                            isOpen={this.state.VerifyListModal}
                            toggle={this.verifyModalToggle}
                          />
                        </React.Fragment>
                      ) : (
                        <div />
                      )}

                      <div className="col-1 text-right p-0" id="profileInfoEdit">
                        {this.props.currentUser.id == currentPageId ? (
                          <AthleteProfilePopover handleUpdate={this.editField} popover="profileInfoEdit" />
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-center justify-content-md-start pl-0">
                      <h3>{this.state.everyThing.SchoolName}</h3>
                      &nbsp; <h4 className="slash"> &nbsp; | &nbsp; </h4> &nbsp;
                      <h3>
                        {this.state.everyThing.City}, {this.state.everyThing.State}
                      </h3>
                    </div>
                    <div className="row justify-content-center justify-content-md-start pl-0">
                      <h3>{this.state.everyThing.ClassYearName}</h3>
                      &nbsp; <h4 className="slash"> &nbsp; | &nbsp; </h4> &nbsp;
                      <h3 style={{ display: "inline-block" }}>Class of </h3>
                      <h3 style={{ display: "inline-block" }}>
                        &nbsp; {this.state.everyThing.HighSchoolGraduationYear}
                      </h3>
                    </div>
                    <div className="row mb-3 justify-content-center justify-content-md-start pl-0">
                      {this.state.everyThing.Height && (
                        <React.Fragment>
                          <h3>
                            Height: {this.state.everyThing.heightFeet}'{this.state.everyThing.heightInches}
                          </h3>
                          {this.state.everyThing.Weight && (
                            <React.Fragment>
                              &nbsp; <h3 className="slash"> &nbsp; | &nbsp; </h3> &nbsp;
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                      {this.state.everyThing.Weight && (
                        <h3>
                          Weight: {this.state.everyThing.Weight}
                          &nbsp;lbs
                        </h3>
                      )}
                    </div>
                    {/* {this.props.currentUser.id != this.props.currentPageId && (
                      <React.Fragment>
                        <div className="row justify-content-center justify-content-md-start">
                          <div onClick={this.toggleFollowerModal} className="d-flex mr-4 ">
                            <h3>
                              Followers&nbsp;&nbsp;
                              {this.state.followerLength}
                            </h3>
                          </div>
                          <div onClick={this.toggleHighlightModal} className="d-flex ml-2">
                            <h3>
                              Highlights &nbsp;
                              {this.state.highlightLength}
                            </h3>
                          </div>
                        </div>
                      </React.Fragment>
                    )} */}

                    <div className="row justify-content-center justify-content-md-between pl-1 pl-md-0 ">
                      <div role="group" className="btn-group mt-3 mt-sm-3 mt-md-3 mt-lg-0">
                        {this.props.currentUser.id != this.props.currentPageId ? (
                          <React.Fragment>
                            {!this.props.following ? (
                              <FollowButton
                                margin="mb-0"
                                style="rs-btn-border-primary"
                                onClick={() => {
                                  this.props.followUser();
                                  this.handleGetContacts();
                                }}
                              />
                            ) : (
                              <FollowOnButton
                                margin="mb-0"
                                style="rs-btn-border-primary-on"
                                onClick={() => {
                                  this.props.followUser();
                                  this.setState({ showMessageButton: false });
                                }}
                              />
                            )}
                            {!this.props.highlighting ? (
                              <HighlightButton
                                margin="mb-0"
                                style="rs-btn-border-primary"
                                onClick={() => this.props.highlightUser()}
                              />
                            ) : (
                              <HighlightOnButton
                                margin="mb-0"
                                style="rs-btn-border-primary-on"
                                onClick={() => this.props.highlightUser()}
                              />
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <button
                              className="jr-btn-default btn btn-default py-2 px-2 profileInfoBtn d-flex"
                              onClick={this.toggleFollowerModal}
                            >
                              <h3 className="mb-0">Followers</h3>
                              <Badge color="default" className="mb-0 pr-0">
                                {this.state.followerLength}
                              </Badge>
                            </button>
                            <button
                              className="jr-btn-default btn btn-default py-2 px-2 profileInfoBtn d-flex"
                              onClick={this.toggleHighlightModal}
                            >
                              <h3 className="mb-0">Highlights</h3>
                              <Badge color="default" className="mb-0 pr-0">
                                {this.state.highlightLength}
                              </Badge>
                            </button>
                          </React.Fragment>
                        )}
                      </div>

                      <div className="d-flex justify-content-end mt-3 mt-sm-3 mt-md-3 mt-lg-0 mb-0 pb-0">
                        <StatsButton className="mr-1" style="rs-btn-primary-light" onClick={this.toggleLinks} />

                        {showMessageButton ? (
                          <NavLink to={{ pathname: "/app/messaging", state: { id: `${currentPageId}` } }}>
                            <MessageButton />
                          </NavLink>
                        ) : (
                          <span>
                            <button
                              id="Tooltip"
                              type="button"
                              className="jr-btn jr-btn-default btn btn-default profileInfoBtnTwo d-flex px-3"
                              style={{ backgroundColor: "#cecece" }}
                            >
                              <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-fw" />
                              &nbsp;
                              <h3 className="mb-0">Message</h3>
                            </button>
                            <Tooltip placement="bottom" target="Tooltip" isOpen={showToolTip} toggle={this.toggle}>
                              You can only message a user if you both follow each other!
                            </Tooltip>
                          </span>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={this.bundleProfileInfo}>
              <div className="form-group profileInfo-info">
                <div className="row mt-3" style={{ position: "relative", left: "4%" }} />
                <div className="row addedHeight col-md-12">
                  <div className="col-md-4">
                    <label>First Name:</label>
                    <input
                      className="nameInputs form-control"
                      onChange={this.handleChange}
                      value={this.state.everyThing.FirstName}
                      name="FirstName"
                    />
                  </div>
                  <div className="col-md-4 px-md-0">
                    <label>Middle Name:</label>
                    <input
                      className="nameInputs form-control"
                      onChange={this.handleChange}
                      value={this.state.everyThing.MiddleName}
                      name="MiddleName"
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label>Last Name:</label>
                    <input
                      className="nameInputs form-control"
                      onChange={this.handleChange}
                      value={this.state.everyThing.LastName}
                      name="LastName"
                    />
                  </div>
                </div>

                <div className="row col-md-12">
                  <div className="col-md-5">
                    <label>School:</label>
                    <AutoComplete
                      numberOfCharacters={5} // when you want callback function to fire
                      callBack={this.callback} // the call back function in the parent you want called
                      value={this.state.everyThing.SchoolName} // value you want changed
                      onChange={this.onChange} // onChange function in the parent
                      name="SchoolName" // name
                      limit={10} // limit the results on the dropdown, recommend 10
                      className={"form-control"} // any classnames you want to include in the input
                      resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
                      onHandleSchoolSelect={this.onHandleSchoolSelect}
                    />
                  </div>
                  <label> </label>
                  <div className="col-md-3 px-md-0">
                    <label>City:</label>
                    <input
                      className="form-control"
                      value={this.state.everyThing.City}
                      name="City"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>State:</label>
                    <StateOptions
                      className="rs-select-size"
                      name="State"
                      defaultValue={this.state.everyThing.State}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row addedHeight col-md-12">
                  <div className="col-md-4 pr-md-0">
                    <label>Class Year</label>
                    <select
                      className="form-control"
                      type="text"
                      value={this.state.everyThing.ClassYearId}
                      name="ClassYearId"
                      onChange={this.handleChange}
                      style={{ height: "2rem" }}
                    >
                      <option>Class Year</option>
                      {this.state.classYearOptions.map(year => (
                        <option name={year.name} key={year.id} value={year.id}>
                          {year.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label>Class of:</label>
                    <input
                      value={this.state.everyThing.HighSchoolGraduationYear}
                      name="HighSchoolGraduationYear"
                      onChange={this.handleChange}
                      min={2000}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row col-md-12">
                  <div className="col">Height </div>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-2">
                    Feet:
                    <input
                      className="form-control"
                      type="number"
                      value={this.state.everyThing.heightFeet}
                      min={4}
                      max={8}
                      name="heightFeet"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-md-2 px-md-0">
                    Inches:
                    <input
                      className="form-control"
                      type="number"
                      value={this.state.everyThing.heightInches}
                      min={0}
                      max={12}
                      name="heightInches"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Weight: </label>
                    <input
                      className="form-control"
                      type="number"
                      value={this.state.everyThing.Weight}
                      max={500}
                      name="Weight"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 text-right mt-4">
                    <CancelButton type="button" className="text-right" onClick={this.onEditCancelClick} />
                    <SaveProfileButton type="submit" className="text-right" />
                  </div>
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
        <FollowerModal
          followerModal={this.state.followerModal}
          toggleFollowerModal={this.toggleFollowerModal}
          grabFollowerLength={this.grabFollowerLength}
          currentPageId={this.props.currentPageId}
        />
        <HighlightListModal
          highlightModal={this.state.highlightModal}
          toggleHighlightModal={this.toggleHighlightModal}
          grabHighlightLength={this.grabHighlightLength}
          currentPageId={this.props.currentPageId}
        />
        <ProfileLinksModal
          linksModal={this.state.linksModal}
          userId={this.props.userId}
          toggleLinks={this.toggleLinks}
          currentProfile={this.props.currentProfile}
          style={{ position: "static" }}
          currentPageId={this.props.currentPageId}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default withRouter(connect(mapStateToProps)(ProfileInfo));
