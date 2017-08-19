import React, { Component } from "react";
import Tone from "tone";
import metronome from "./metronome.js";
import Slider from 'react-rangeslider';
import IconButton from './IconButton.jsx';
import './css/flaticon.css';
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
      on: this.metronome.isPlaying
    }
    this.decrementMetronome = this.decrementMetronome.bind(this);
    this.incrementMetronome = this.incrementMetronome.bind(this);
    this.toggleMetronome = this.toggleMetronome.bind(this);
    this.updateBPM = this.updateBPM.bind(this);
    this.onBPMUpdate = this.onBPMUpdate.bind(this);
  }
  updateBPM(newBpm) {
    this.setState({bpm:newBpm});
  }
  onBPMUpdate(newBPM){
    this.updateBPM(newBPM);
  }
  componentDidMount() {
    this.metronome.draw(
      () => {

      },
      () => {

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
    const newBpm = this.state.bpm - 1 ;
    if (newBpm < this.state.bpmLowerLimit) return;
    this.metronome.setBpm(newBpm);
    this.updateBPM(newBpm);
  }
  incrementMetronome() {
    const newBPM = this.state.bpm + 1;
    if (newBPM > this.state.bpmUpperLimit) return;
    this.metronome.setBpm(newBPM);
    this.updateBPM(newBPM);
  }
  render() {
    const iconButtonStyle = {
      position:'relative',
      top:'-14px'
    }
    let playPauseIcon = this.state.on ? "flaticon-pause-button" : "flaticon-play-button";

    return (
      <div className="metronome-container">
       <div className="bpm-container clearfix">
        <h1 className="bpm inline">{this.state.bpm}</h1><sub>BPM</sub><br/>
        <button className="play-pause-button circle" ref={btn=> {this.playbutton = btn}} onClick={() => this.toggleMetronome()}>
          <i className={playPauseIcon}></i>
        </button>
        </div>
        <div>
          <IconButton theClass="icon-lg" icon="-" theStyle={iconButtonStyle} onClick={this.decrementMetronome}></IconButton>
          <div className="slider-container">
            <Slider
            value={this.state.bpm}
            min={this.state.bpmLowerLimit}
            max={this.state.bpmUpperLimit}
            tooltip={false}
            onChange={(e) => { this.onBPMUpdate(e)}}
            onChangeComplete={(e) => {this.metronome.setBpm(this.state.bpm)}}
          />
          </div>
          <IconButton theClass="icon-lg" icon="+" theStyle={iconButtonStyle} onClick={this.incrementMetronome}></IconButton>
        </div>
      </div>
    );
  }
}
