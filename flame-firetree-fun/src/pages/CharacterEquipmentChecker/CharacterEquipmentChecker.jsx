import React, { Component } from "react";

import Select from "react-select";
import EquipmentTable from "../../components/EquipmentTable/EquipmentTable";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import shadowlandsimg from "../../assets/shadowlandsimg.jpg";

class CharacterEquipmentChecker extends Component {
  state = {
    serverName: " ",
    characterName: " ",
    equipmentData: [],
    equipmentBool: false,
    realms: [{}],
  };

  handleServerChange = (event) => {
    //this.setState({ serverName: event.target.value });
  };
  handleNameChange = (event) => {
    this.setState({ characterName: event.target.value });
  };

  //creating the character equipment API

  get_equipment = async () => {
    console.log(this.state.serverName);
    fetch(
      "https://us.api.blizzard.com/profile/wow/character/" +
        // this.state.serverName.toLowerCase().replace("'", "").replace(" ", "-") +
        this.state.serverName +
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

  // beginning of dropdown table loop, utilizing API call to get realm name
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
          height: "auto",
        }}
      >
        <Container fluid>
          <figure className="position-relative">
            <img
              src={shadowlandsimg}
              alt="shadowlandsimg"
              className="img-fluid"
            />
          </figure>
        </Container>
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
            <Form.Label>Server Name</Form.Label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <Select
                  options={this.state.realms}
                  styles={styles}
                  onChange={(opt) => this.setState({ serverName: opt.value })}
                />
              </div>
            </div>
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
      </div>
    );
  }
}

export default CharacterEquipmentChecker;
