import React, { Component } from "react";
export default class FretContainer extends Component {
render(){
  return (
    <tr className={this.props.fret === 0 ? 'base-fret-container':'fret-container'}>
      {this.props.children}
    </tr>
  );
}
}
