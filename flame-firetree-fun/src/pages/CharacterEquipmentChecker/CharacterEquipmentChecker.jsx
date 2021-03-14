import React, { Component } from "react";
// import "./MythicDungeonChecker.css";

import EquipmentTable from "../../components/EquipmentTable/EquipmentTable";
import { Form } from "react-bootstrap";
// import Dropdown from "popper.js";

class CharacterEquipmentChecker extends Component {
  state = {
    serverName: " ",
    characterName: " ",
    equipmentData: [],
    equipmentBool: false,
  };

  handleServerChange = (event) => {
    this.setState({ serverName: event.target.value });
  };
  handleNameChange = (event) => {
    this.setState({ characterName: event.target.value });
  };

  //creating the character equipment API

  get_equipment = async () => {
    fetch(
      "https://us.api.blizzard.com/profile/wow/character/" +
        this.state.serverName.toLowerCase().replace("'", "").replace(" ", "-") +
        "/" +
        this.state.characterName
          .toLowerCase()
          .replace("'", "")
          .replace(" ", "-") +
        "/equipment?namespace=profile-us&locale=en_US&access_token=" +
        this.props.token
    )
      .catch((e) => console.log(e))
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          equipmentData: res.equipped_items,
          equipmentBool: true,
        });
        console.log(res);
      });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "darkgray",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Character Checker</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>This tool checks a player's equipment</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Server Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="serverName"
                onChange={this.handleServerChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Character Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="characterName"
                onChange={this.handleNameChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-dark btn-lg w-20"
            onClick={this.get_equipment}
          >
            Check!
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          {this.state.equipmentBool ? (
            <EquipmentTable equipmentData={this.state.equipmentData} />
          ) : null}
        </div>

        {/* <div>
          <Dropdown title drop>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>
    );
  }
}

export default CharacterEquipmentChecker;
