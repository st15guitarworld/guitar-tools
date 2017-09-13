import React, { Component } from "react";
import TunerGraphic from './TunerGraphic';
import PitchDetect from './PitchDetect';

export default class TunerContainer extends Component {

  componentDidMount() {
      this.graphic = TunerGraphic(this.tunerCanvas);
      this.pitchDetector = PitchDetect(this.graphic.onUpdate);
      this.graphic.draw();
      this.pitchDetector.on();
  }
  componentWillUnmount() {
    this.pitchDetector.off();
  }
  render() {
    return <div ref={(div)=>{this.tunerCanvas = div;}}></div>;
  }
}
