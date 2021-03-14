import React, { Component } from "react";
import "./MythicDungeonChecker.css";

import MythicTable from "../../components/MythicTable/MythicTable";
import { Form } from "react-bootstrap";
class MythicDungeonChecker extends Component {
  state = {
    roster_data: {},
    roster_fetch: false,
    serverName: " ",
    guildName: " ",
    characterName: " ",
  };
  // Victor Ly
  get_roster = async () => {
    await fetch(
      "https://us.api.blizzard.com/data/wow/guild/" +
        this.state.serverName.toLowerCase().replace("'", "").replace(" ", "-") +
        "/" +
        this.state.guildName.toLowerCase().replace(" ", "-") +
        "/roster?namespace=profile-us&locale=en_US&access_token=" +
        this.props.token
    )
      .catch((e) => console.log(e))
      .then((response) => response.json())
      .then((res) => {
        this.setState({ roster_data: res.members, roster_fetch: true });
        console.log(res);
      });
  };

  handleChange = (event) => {
    let obj = {};
    obj[event.target.placeholder] = event.target.value;
    this.setState(obj);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Guild +15 Checker</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>
            This tool allows you to sort an entire guild roster to check if a
            Mythic 15 Dungeon has been completed.
          </h3>
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
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Guild Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="guildName"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </div>

        <div style={{ marginTop: 10 }}>
          {this.state.roster_fetch ? (
            <MythicTable roster_data={this.state.roster_data} />
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-primary btn-lg w-20"
            onClick={this.get_roster}
          >
            Check!
          </button>
        </div>
      </div>
    );
  }
}
export default MythicDungeonChecker;
