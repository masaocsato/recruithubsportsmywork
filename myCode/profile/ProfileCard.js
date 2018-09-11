import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody } from "reactstrap";
import ProfileTabs from "./ProfileTabs";
import ProfileBio from "./ProfileBio";

class ProfileCard extends React.Component {
  state = {
    activeTab: "1"
  };

  render() {
    return (
      <div className="profile-intro mb-4">
        <ProfileTabs
          handleChange={this.props.handleChange}
          stats={this.props.stats}
          gpa={this.props.gpa}
          sat={this.props.sat}
          act={this.props.act}
          desiredMajor={this.props.desiredMajor}
          userProfile={this.props.userProfile}
        />
        {/* <div className="pi-footer">
          <div className="icons-wrapper">
            <a className="icon facebook-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-facebook zmdi-hc-fw zmdi-hc-lg" />
            </a>
            <a className="icon twitter-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-twitter zmdi-hc-fw zmdi-hc-lg" />
            </a>
            <a className="icon linkedin-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-linkedin zmdi-hc-fw zmdi-hc-lg" />
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ProfileCard;
