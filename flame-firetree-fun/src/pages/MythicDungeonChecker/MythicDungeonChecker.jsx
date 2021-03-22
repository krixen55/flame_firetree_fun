import React, { Component } from "react";
import "./MythicDungeonChecker.css";
import Select from "react-select";
import MythicTable from "../../components/MythicTable/MythicTable";
import { Form } from "react-bootstrap";

class MythicDungeonChecker extends Component {
  state = {
    roster_data: {},
    roster_fetch: false,
    serverName: " ",
    guildName: " ",
    characterName: " ",
    realms: [{}],
  };
  // Victor Ly
  get_roster = async () => {
    await fetch(
      "https://us.api.blizzard.com/data/wow/guild/" +
        this.state.serverName +
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
  getServerNames = async () => {
    fetch(
      "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US&access_token=" +
        this.props.token
    )
      .then((response) => response.json())

      .then((res) => {
        const temprealmlist = [];
        for (var i = 0; i < res.realms.length; i++) {
          const temprealmdict = {};
          temprealmdict["value"] = res.realms[i].slug;
          temprealmdict["label"] = res.realms[i].name;

          temprealmlist.push(temprealmdict);
        }
        this.setState({
          realms: temprealmlist,
        });

        console.log(res);
      });
  };
  componentDidMount() {
    this.getServerNames();
  }

  handleChange = (event) => {
    let obj = {};
    obj[event.target.placeholder] = event.target.value;
    this.setState(obj);
  };

  render() {
    const styles = {
      container: (base) => ({
        ...base,
        flex: 1,
      }),
    };
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
          <h1>Guild Dungeon Checker</h1>
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
            <div style={{ display: "flex", width: "100%" }}>
              <Select
                options={this.state.realms}
                styles={styles}
                onChange={(opt) => this.setState({ serverName: opt.value })}
              />
            </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-dark btn-lg w-20"
            onClick={this.get_roster}
          >
            Check!
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          {this.state.roster_fetch ? (
            <MythicTable roster_data={this.state.roster_data} />
          ) : null}
        </div>
      </div>
    );
  }
}
export default MythicDungeonChecker;
