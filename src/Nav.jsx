import React, { Component } from "react";
import { NavLink } from "react-router-dom";
let linkStyle = {
  display:'block'
};
export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <ul>
          <li>
            <NavLink strict exact to="/" activeClassName="is-active" style={linkStyle}>
              <i className="flaticon-metronome"></i>
              Metronome
            </NavLink>
          </li>
          <li>
            <NavLink to="/tuner" activeClassName="is-active" style={linkStyle}>
            <i className="flaticon-tuning-fork-shaped"></i>
              Tuner
            </NavLink>
          </li>
          <li>
            <NavLink to="/chord-finder" activeClassName="is-active" style={linkStyle}>
            <i className="flaticon-music"></i>
              Chords
            </NavLink>
          </li>
          <li>
            <NavLink to="/scale-viewer" activeClassName="is-active" style={linkStyle}>
              <i className="flaticon-musical-note-black-shape"></i>
              Scales
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
