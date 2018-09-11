import React from "react";
import { SaveProfileButton, CancelButton } from "../CustomComponents/Button";
import AthleteProfilePopover from "../CustomComponents/Popover/AthleteProfilePopver";
import { connect } from "react-redux";

class AthleteAcademics extends React.Component {
  state = {
    editAcademics: false,
    prevPropsGpa: 0,
    prevPropsSat: 0,
    prevPropsAct: 0,
    prevPropsAcademicNotes: "",
    gpa: 0,
    sat: 0,
    act: 0,
    academicNotes: ""
  };

  handleEditAcademics = () => {
    this.setState({
      editAcademics: !this.state.editAcademics
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.gpa !== state.prevPropsGpa ||
      props.sat !== state.prevPropsSat ||
      props.act !== state.prevPropsAct ||
      props.academicNotes !== state.prevPropsAcademicNotes
    ) {
      return {
        gpa: props.gpa,
        prevPropsGpa: props.gpa,
        sat: props.sat,
        prevPropsSat: props.sat,
        act: props.act,
        prevPropsAct: props.act,
        prevPropsAcademicNotes: props.academicNotes,
        academicNotes: props.academicNotes
      };
    }
    return null;
  }

  handleAcademicSaveProfile = e => {
    e.preventDefault();
    this.setState({
      editAcademics: false
    });
    this.props.grabAcademicInfo(this.state.gpa, this.state.sat, this.state.act, this.state.academicNotes);
  };

  onCancelEdit = () => {
    this.setState(
      {
        gpa: this.state.prevPropsGpa,
        sat: this.state.prevPropsSat,
        act: this.state.prevPropsAct,
        academicNotes: this.state.prevPropsAcademicNotes
      },
      () => {
        this.handleEditAcademics();
      }
    );
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  render() {
    const { currentPageId } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="mb-0">Academic</h3>
          </div>
          <div className="">
            {this.props.currentUser.id == currentPageId && this.state.editAcademics === false ? (
              <AthleteProfilePopover popover={this.props.popover} handleUpdate={this.handleEditAcademics} />
            ) : (
              <div />
            )}
          </div>
        </div>

        {this.state.editAcademics === false ? (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-3 pl-0 pr-0">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  GPA
                </h3>
                <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.gpa}</h2>
              </div>
              {/* <span style={{ fontSize: "30px", color: "#b1afaf" }}>|</span> */}
              <div className="col-4 pl-0 pr-0 border-left border-right">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  SAT
                </h3>
                <div>
                  <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.sat}</h2>
                </div>
              </div>
              {/* <span style={{ fontSize: "30px", color: "#b1afaf" }}>|</span> */}
              <div className="col-3 pl-0 pr-0">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  ACT
                </h3>
                <div>
                  <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.act}</h2>
                </div>
              </div>
            </div>
            <div className="meta-date mt-3">{this.props.academicNotes}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={this.handleAcademicSaveProfile}>
              <div className="form-group">
                <div className="row">
                  <div className="col-3">
                    <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                      GPA
                    </h3>
                    <input
                      className="form-control"
                      value={this.state.gpa}
                      type="number"
                      name="gpa"
                      min={0.1}
                      step="any"
                      max={5}
                      onChange={this.handleChange}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <span style={{ fontSize: "2.5em" }}>|</span>
                  <div className="col-4">
                    <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                      SAT
                    </h3>
                    <div>
                      <input
                        className="form-control"
                        value={this.state.sat}
                        type="number"
                        min={400}
                        max={1600}
                        name="sat"
                        onChange={this.handleChange}
                        style={{ textAlign: "center" }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: "2.5em" }}>|</span>
                  <div className="col-3 ">
                    <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                      ACT
                    </h3>
                    <div>
                      <input
                        className="form-control"
                        value={this.state.act}
                        type="number"
                        min={1}
                        max={36}
                        name="act"
                        onChange={this.handleChange}
                        style={{ textAlign: "center" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="sub-heading mt-3 mb-3">
                  <textarea
                    className="form-control"
                    value={this.state.academicNotes}
                    name="academicNotes"
                    type="text"
                    max={200}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  <CancelButton type="button" onClick={this.onCancelEdit} />
                  <SaveProfileButton type="submit" />
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(AthleteAcademics);
