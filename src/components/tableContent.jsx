import React, { Component } from "react";

class TableWithTitle extends Component {
  render() {
    return (
      <table id={this.props.tableId}>
        <tr>
          <th>{this.props.title}</th>
        </tr>
		  <tr>
			  {this.props.colTitles.map((col) => ( <td>{col}</td>))};
		  </tr>
		  {this.props.rows.map((row) => ( <td>{row.id}</td><td>{row.key}</td><td>{row.value}</td>))};
		  
      </table>
    );
  }
}
// id: "psu2", key: "", value: "" 
export default TableWithTitle;
