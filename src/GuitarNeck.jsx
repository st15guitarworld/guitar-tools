import React, { Component } from "react";
import FretContainer from './FretContainer'
import Fret from './Fret';
import tonal from 'tonal'

export default class GuitarNeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chord:[0,0,0,0,0,0],
      tuning:["E4","B3","G3","D3","A2","E2"]
    };
    this.isActiveFret = this.isActiveFret.bind(this);
    this.generateFretContainers = this.generateFretContainers.bind(this);
    this.noteSelected = this.noteSelected.bind(this);
    this.getNoteFromBase =
    this.getNoteFromBase.bind(this);
  }
  getNoteFromBase(string,semitones){
    let stringNote = this.state.tuning[string-1];
    let interval = tonal.ivl.fromSemitones(semitones);
    let note = tonal.transpose(stringNote,interval);
    let pcnote = tonal.note.pc(note);
    return pcnote;
  }
  noteSelected(string,fret) {
    let newChord = this.state.chord.slice();
    newChord[string-1] = fret;
    this.setState({chord:newChord});
  }
  isActiveFret(stringNumber,fretNumber){
    if(this.state.chord[stringNumber-1] === fretNumber){
        return true;
    }
    return false;
  }
  generateFretContainers(fretNumber) {
    return (
      <FretContainer fret={fretNumber} >
        <Fret note={this.getNoteFromBase(6,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={6} fret={fretNumber} isActiveFret={this.isActiveFret(6,fretNumber)}/>
        <Fret note={this.getNoteFromBase(5,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={5} fret={fretNumber} isActiveFret={this.isActiveFret(5,fretNumber)}/>
        <Fret note={this.getNoteFromBase(4,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={4} fret={fretNumber} isActiveFret={this.isActiveFret(4,fretNumber)}/>
        <Fret note={this.getNoteFromBase(3,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={3} fret={fretNumber} isActiveFret={this.isActiveFret(3,fretNumber)}/>
        <Fret note={this.getNoteFromBase(2,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={2} fret={fretNumber} isActiveFret={this.isActiveFret(2,fretNumber)}/>
        <Fret note={this.getNoteFromBase(1,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={1} fret={fretNumber} isActiveFret={this.isActiveFret(1,fretNumber)}/>
      </FretContainer>
    )
  }
  render() {
    return (
      <table className="guitar-neck">
        <tbody>
        {this.generateFretContainers(1)}
        {this.generateFretContainers(2)}
        {this.generateFretContainers(3)}
        {this.generateFretContainers(4)}
        {this.generateFretContainers(5)}
        {this.generateFretContainers(6)}
        {this.generateFretContainers(7)}
        {this.generateFretContainers(8)}
        {this.generateFretContainers(9)}
        {this.generateFretContainers(10)}
        {this.generateFretContainers(11)}
        {this.generateFretContainers(12)}
      </tbody>
      </table>
    );
  }
}
