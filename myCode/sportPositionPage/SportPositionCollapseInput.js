import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { DeleteButton } from "../../../CustomComponents/Button";

class SportPositionCollapseInput extends React.Component {
  state = {
    alert: null // have an alert state
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete ${this.props.removedPosition}`}
        onConfirm={this.props.removePosition} //what function you want on confirm
        onCancel={this.cancelAlert} //what function you want on cancel
      />
    );
    this.setState({ alert: getAlert() });
  };

  cancelAlert = () => {
    this.setState({
      alert: null
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <input
            type="text"
            style={{ marginRight: "20px" }}
            // className="form-control"
            placeholder="Name"
            name="name"
            size="20"
            value={this.props.position.name}
            onChange={this.props.handleChange}
          />
          <strong style={{ fontSize: "20px" }}>( </strong>
          <input
            type="text"
            // className="form-control"
            placeholder="Code"
            name="code"
            size="2"
            value={this.props.position.code}
            onChange={this.props.handleChange}
          />
          <strong style={{ fontSize: "20px" }}> )</strong>
          <input
            type="checkbox"
            name="inactive"
            style={{ marginLeft: "20px" }}
            checked={this.props.position.inactive}
            value={this.props.position.inactive}
            onChange={this.props.handleChange}
          />
          <label htmlFor="inactiveCheckbox">Inactive</label>
          <span style={{ float: "right" }}>
            <DeleteButton onClick={this.delete} />
          </span>
        </div>

        {this.state.alert}
      </React.Fragment>
    );
  }
}
export default SportPositionCollapseInput;
