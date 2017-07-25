import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <ul>
          <li>
            <NavLink strict exact to="/" activeClassName="is-active">
              Metronome
            </NavLink>
          </li>
          <li>
            <NavLink to="/tuner" activeClassName="is-active">
              Tuner
            </NavLink>
          </li>
          <li>
            <NavLink to="/chord-finder" activeClassName="is-active">
              Chord Finder
            </NavLink>
          </li>
          <li>
            <NavLink to="/scale-viewer" activeClassName="is-active">
              Scale Viewer
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
