import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "./SportPosition.css";
import SportPositionCollapseInput from "./SportPositionCollapseInput";

class SportPositionCollapse extends Component {
  state = { collapse: false };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
    this.props.handleEditClick(this.props.position);
  };

  render() {
    return (
      <React.Fragment>
        <div
          onClick={this.toggle}
          // onClick={this.props.handleCollapseAll(this.props.position.id)}
          style={{ marginBottom: "1rem" }}
          key={this.props.position.id}
          className={this.props.position.inactive ? "positionInactive row" : "positionActive row"}
          // className="row"
        >
          <div className="col-10">
            {this.props.position.name}({this.props.position.code})
          </div>
          <div className="col-2">
            <a
              // className="btn btn-link"
              onClick={() => {
                this.props.handleEditClick(this.props.position);
              }}
            >
              Edit
            </a>
          </div>
        </div>

        <div>
          <Collapse isOpen={this.state.collapse}>
            <SportPositionCollapseInput
              handleEditClick={this.handleEditClick}
              removePosition={this.props.removePosition}
              removedPosition={this.props.removedPosition}
              position={this.props.position}
              handleCheck={this.props.handleCheck}
              handleChange={this.props.handleChange}
              handleUpdateClick={this.props.handleUpdateClick}
              sportsData={this.props.sportsData}
            />
          </Collapse>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default SportPositionCollapse;
