import React, { Component } from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class MythicTable extends Component {
  state = {
    tableBody: [],
    tableBodyReady: false,
  };
  componentDidUpdate(prevprops) {
    if (this.props.roster_data !== prevprops.roster_data) {
      this.setState({ tableBody: [] });
      this.props.roster_data.map(this.renderCharacter);
    }
  }

  checkForFifteen = (data) => {
    var i;
    for (i of data.mythic_plus_previous_weekly_highest_level_runs) {
      if (i.mythic_level >= 15) {
        return true;
      }
    }
    return false;
  };

  capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  checkMythicPlus = async (name, realm, char, index) => {
    var didTheyDoIt = false;
    await fetch(
      "https://raider.io/api/v1/characters/profile?region=us&realm=" +
        realm +
        "&name=" +
        name +
        "&fields=mythic_plus_previous_weekly_highest_level_runs"
    )
      .catch((e) => console.log(e))
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.statusCode !== 400) {
          didTheyDoIt = this.checkForFifteen(res);
          this.setState({
            tableBody: this.state.tableBody.concat({
              name: char.character.name,
              realm: this.capitalize(char.character.realm.slug),
              rank: char.rank,
              complete: didTheyDoIt ? "Yes" : "No",
            }),
          });
        }
      });
  };

  renderCharacter = (char, index) => {
    // eslint-disable-next-line
    var didTheyDoIt = false;
    if (char.rank > 6 || char.character.level < 50) {
      return null;
    }
    didTheyDoIt = this.checkMythicPlus(
      char.character.name,
      char.character.realm.slug,
      char,
      index
    );
  };

  componentDidMount() {
    this.props.roster_data.map(this.renderCharacter);
  }

  sortByName = () => {};

  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.state.tableBody}
        striped
        hover
        tableStyle={{ background: "#a9a9a9" }}
      >
        <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="realm" dataSort={true}>
          Realm
        </TableHeaderColumn>
        <TableHeaderColumn dataField="rank" dataSort={true}>
          Rank
        </TableHeaderColumn>
        <TableHeaderColumn dataField="complete" dataSort={true}>
          15 Last Week?
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default MythicTable;
