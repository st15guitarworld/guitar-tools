import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <ul>
          <li>
            <NavLink strict exact to="/" activeClassName="is-active">
              <i className="flaticon-metronome"></i>
              Metronome
            </NavLink>
          </li>
          <li>
            <NavLink to="/tuner" activeClassName="is-active">
            <i className="flaticon-tuning-fork-shaped"></i>
              Tuner
            </NavLink>
          </li>
          <li>
            <NavLink to="/chord-finder" activeClassName="is-active">
            <i className="flaticon-music"></i>
              Chord Finder
            </NavLink>
          </li>
          <li>
            <NavLink to="/scale-viewer" activeClassName="is-active">
              <i className="flaticon-musical-note-black-shape"></i>
              Scale Viewer
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
