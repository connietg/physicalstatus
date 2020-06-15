import React, { Component } from "react";
import TableWithTitle from "./tableContent";

class PhysicalServerStatus extends Component {
  /** The thought here is to create an object tree in the state to set the parameters from the statusdemo
   * and to update that every second.
   */
  state = {
    serverPowerSupplyUnit: {
		title: "Power Supply Units",
		tableId: "server_power_supply_unit",
      colTitles: ["Name", "Status", "Volt"],
		rows: [
			{ id: "psu1", key: "", value: "" },
			{ id: "psu2", key: "", value: "" }
		],
    },
    serverStatus: {
		title: "Server Status",
		tableId: "server_status",
      colTitles: ["Name", "Link Status", "Bps"],
      rows: [
			{ id: "mgmt1", key: "", value: "" },
			{ id: "mgmt2", key: "", value: "" },
			{ id: "data1", key: "", value: "" },
			{ id: "data2", key: "", value: "" }],
    },
  };

  componentDidMount() {
    this.interval = setInterval(() => this.getStatus, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatus = () => {
    let status = cockpit.script("/usr/local/bin/statusdemo", [args], [options]);
    process.then((data, message) => {
      updateServerStatus(status);
    });
  };

  /** The thought is to update only the parameters that changes, but I have not yet found the right syntax 
   */
  updateServerStatus = (status) => {
    this.setState((status) => {
      let jStatus = JSON.parse(status);
      return {
        serverPowerSupplyUnit: {
          rows[0]: { values: { key: jStatus.psu1.status } },
        },
        serverPowerSupplyUnit: {
          rows[0]: { values: { value: jStatus.psu1.volt } },
        },
        serverPowerSupplyUnit: {
          rows[1]: { values: { key: jStatus.psu2.status } },
        },
        serverPowerSupplyUnit: {
          rows[1]: { values: { value: jStatus.psu2.volt } },
		  },
        serverStatus: { rows[0]: { values: { key: jStatus.mgmt1.link_status } } },
        serverStatus: { rows[0]: { values: { value: jStatus.mgmt1.bps } } },
        serverStatus: { rows[1]: { values: { key: jStatus.mgmt2.link_status } } },
        serverStatus: { rows[1]: { values: { value: jStatus.mgmt2.bps } } },
        serverStatus: { rows[2]: { values: { key: jStatus.data1.link_status } } },
        serverStatus: { rows[2]: { values: { value: jStatus.data1.bps } } },
        serverStatus: { rows[3]: { values: { key: jStatus.data2.link_status } } },
        serverStatus: { rows[3]: { values: { value: jStatus.data2.bps } } },
      };
    });
  };
  //state = {};
  render() {
    return (
      <React.Fragment>
        <img src="../image/physicalServer.jpg" alt="Cannot show image"></img>
        <TableWithTitle serverPowerSupplyUnit />
        <TableWithTitle serverStatus />
      </React.Fragment>
    );
  }
}

export default PhysicalServerStatus;
