import React, { Component } from "react";
import Tone from "tone";
import metronome from "./metronome.js";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

export default class MetronomeContainer extends Component {
  constructor(props) {
    super(props);
    this.metronome = metronome();
    this.metronome.init();
    this.state = {
      bpm: this.metronome.getBpm(),
      bpmLowerLimit: 40,
      bpmUpperLimit: 300,
      on: this.metronome.isPlaying,
    };

    this.decrementMetronome = this.decrementMetronome.bind(this);
    this.incrementMetronome = this.incrementMetronome.bind(this);
    this.toggleMetronome = this.toggleMetronome.bind(this);
  }
  componentDidMount() {
    this.metronome.draw(
      () => {
        this.playbutton.style.color = "red";
      },
      () => {
        this.playbutton.style.color = "green";
      }
    );
  }

  componentWillUnmount() {
    if (this.state.on) {
      this.metronome.play();
    }
    this.metronome.undraw();
  }

  toggleMetronome() {
    this.setState({ on: !this.state.on });
    this.metronome.play();
  }
  decrementMetronome() {
    const oldBPM = this.state.bpm;
    this.metronome.setBpm(oldBPM - 1);
    this.setState({ bpm: oldBPM - 1 });
  }
  incrementMetronome() {
    const oldBPM = this.state.bpm;
    this.metronome.setBpm(oldBPM + 1);
    this.setState({ bpm: oldBPM + 1 });
  }
  render() {
    return (
      <div className="metronome-container">
        <h1 className="bpm">{this.state.bpm}</h1><sub>BPM</sub><br/>
        {/* <button onClick={() => this.decrementMetronome()}>-</button>

        <button onClick={() => this.incrementMetronome()}>+</button> */}
        <Slider
        value={this.state.bpm}
        min={this.state.bpmLowerLimit}
        max={this.state.bpmUpperLimit}
        tooltip={false}
        onChange={(e) => { this.setState({bpm:e})}}
        onChangeComplete={() => this.metronome.setBpm(this.state.bpm)}
      />
        <button
          onClick={() => this.toggleMetronome()}
          ref={btn => {
            this.playbutton = btn;
          }}
        >
          {this.state.on ? "Pause" : "Start"}
        </button>
      </div>
    );
  }
}
