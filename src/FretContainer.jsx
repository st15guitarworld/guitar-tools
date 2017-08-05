import React, { Component } from "react";
export default class FretContainer extends Component {
render(){
  return (
    <tr>
      {this.props.children}
    </tr>
  );
}
}
