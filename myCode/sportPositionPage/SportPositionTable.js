import React, { Component } from "react";
import ReactDOM from "react-dom";
import SportPositionCollapse from "./SportPositionCollapse";
import "./SportPosition.css";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { CancelButton, SaveButton, CreateButton } from "../../../CustomComponents/Button";

class SportPositionTable extends Component {
  state = {
    collapse: false,
    removedPosition: ""
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleChange = (event, index) => {
    // take this.props.sportsData
    // immutably modify the property e.target.name
    // of the object at index
    // then you will have a new array
    // pass that array to this.props.updateSportsDataPositions
    let newSportsData = this.props.sportsData.map((position, i) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      if (i !== index) {
        return position;
      } else {
        return {
          ...position,
          [name]: value
        };
      }
    });

    this.props.updateSportsDataPositions(newSportsData);
  };

  addPosition = () => {
    let newSportsData = [...this.props.sportsData];
    let newPosition = {
      name: this.props.name,
      code: this.props.code,
      inactive: this.props.inactive
    };
    console.log(newPosition);
    newSportsData.push(newPosition);
    this.props.updateSportsDataPositions(newSportsData);
    this.toggle;
  };

  removePosition = (event, index) => {
    let newSportsData = [...this.props.sportsData];
    let removedPosition = newSportsData[index];
    this.setState(
      {
        removedPosition
      },
      () => console.log(this.state.removedPosition)
    );
    newSportsData.splice(index, 1);
    console.log(newSportsData, "after splice");
    this.props.updateSportsDataPositions(newSportsData);
    this.toggle;
  };

  render() {
    return (
      <div>
        <h2>Sports Positions</h2>
        <div onClick={this.toggle}>
          <div style={{ position: "relative", left: "80%" }} className="btn btn-link">
            + Add New
          </div>
        </div>
        <div>
          <Collapse isOpen={this.state.collapse}>
            <div className="" style={{ margin: "10px", paddingBottom: "50px" }}>
              <header>
                <h3>Sport Position Add Form</h3>
              </header>

              <div className=" form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.props.name}
                  onChange={this.props.handleChangeAdd}
                />
              </div>
              <div className="form-group">
                <label>Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  value={this.props.code}
                  onChange={this.props.handleChangeAdd}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="inactive"
                  value={!!this.props.inactive}
                  id="inactiveCheckbox"
                  onChange={this.props.handleCheck}
                />
                <label htmlFor="inactiveCheckbox">Inactive</label>
              </div>
              <div className=" form-group float-right">
                <CreateButton onClick={() => this.addPosition()} />

                <CancelButton onClick={this.toggle} />
              </div>
            </div>
          </Collapse>
        </div>
        <hr />

        {this.props.sportsData &&
          this.props.sportsData.map((position, index) => (
            <SportPositionCollapse
              handleCollapseAll={this.props.handleCollapseAll}
              key={position.id}
              position={position}
              handleUpdateClick={this.props.handleUpdateClick}
              handleEditClick={this.props.handleEditClick}
              removePosition={e => this.removePosition(e, index)}
              removedPosition={this.state.removedPosition}
              handleCheck={this.props.handleCheck}
              handleChange={e => this.handleChange(e, index)}
              code={this.props.code}
              name={this.props.name}
              sportId={this.props.sportId}
              sportsData={this.props.sportsData}
            />
          ))}
      </div>
    );
  }
}

export default SportPositionTable;
