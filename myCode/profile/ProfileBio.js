import React from "react";
import { Input } from "reactstrap";
import "./profileCard.css";
import { SaveButton, CancelButton } from "../CustomComponents/Button";
import AthleteProfilePopover from "../CustomComponents/Popover/AthleteProfilePopver";
import { connect } from "react-redux";

class ProfileBio extends React.Component {
  state = {
    editBio: false,
    prevPropsBio: "",
    Bio: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (props.bio !== state.prevPropsBio) {
      return {
        prevPropsBio: props.bio,
        Bio: props.bio
      };
    }
    return null;
  }

  handleEditBio = () => {
    this.setState({
      editBio: !this.state.editBio
    });
  };

  cancelEdit = () => {
    this.setState({ Bio: this.state.prevPropsBio }, () => this.handleEditBio());
  };

  handleBioSaveProfile = () => {
    this.setState({
      editBio: false
    });
    this.props.handleEditBio(this.state.Bio);
  };

  render() {
    const { currentPageId } = this.props;
    return (
      <div className="ml-2">
        <div className="text-right">
          {this.props.currentUser.id == currentPageId && this.state.editBio == false ? (
            <AthleteProfilePopover popover={this.props.popover} handleUpdate={this.handleEditBio} />
          ) : (
            <div />
          )}
        </div>

        {this.state.editBio === false ? (
          <p>{this.props.bio}</p>
        ) : (
          <React.Fragment>
            <Input
              className="w-100 h-100 profileCardTextArea"
              type="textarea"
              name="bio"
              placeholder="Your bio goes here."
              rows="10"
              autoFocus
              value={this.state.Bio}
              onChange={e => this.setState({ Bio: e.target.value })}
            />
            <div className="row">
              <div className="col-md-12 text-right pt-3">
                <CancelButton type="button" className="text-right" onClick={this.cancelEdit} />
                <SaveButton type="button" className="text-right" onClick={this.handleBioSaveProfile} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(ProfileBio);
