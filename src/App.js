import React, { Component } from "react";
import MetronomeContainer from "./MetronomeContainer";
import TunerContainer from "./TunerContainer";
import ChordFinderContainer from "./ChordFinderContainer";
import ScalesContainer from "./ScalesContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Nav />
          <section className="route-container">
            <Route exact path="/" component={MetronomeContainer} />
            <Route path="/tuner" component={TunerContainer} />
            <Route path="/chord-finder" component={ChordFinderContainer} />
            <Route path="/scale-viewer" component={ScalesContainer} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
