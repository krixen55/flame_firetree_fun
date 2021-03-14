import React, { Component } from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class EquipmentTable extends Component {
  state = {
    tableBody: [],
    tableBodyReady: false,
  };
  componentDidUpdate(prevprops) {
    if (this.props.equipmentData !== prevprops.equipmentData) {
      var tableData = [];
      for (var i = 0; i < this.props.equipmentData.length; i++) {
        tableData.push(this.renderEquipment(this.props.equipmentData[i]));
      }
      this.setState({ tableBody: tableData });
    }
  }

  renderEquipment = (char, index) => {
    return {
      name: char.name,
      slot: char.slot.name,
      level: char.level.value,
    };
  };

  componentDidMount() {
    var tableData = [];
    for (var i = 0; i < this.props.equipmentData.length; i++) {
      tableData.push(this.renderEquipment(this.props.equipmentData[i]));
    }
    this.setState({ tableBody: tableData });
  }

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
        <TableHeaderColumn dataField="slot" dataSort={true}>
          Slot
        </TableHeaderColumn>
        <TableHeaderColumn dataField="level" dataSort={true}>
          Item Level
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default EquipmentTable;
