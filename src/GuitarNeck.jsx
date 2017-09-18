import React, { Component } from "react";
import FretContainer from './FretContainer'
import Fret from './Fret';
import tonal from 'tonal'

export default class GuitarNeck extends Component {
  constructor(props) {
    super(props);
    this.isActiveFret = this.isActiveFret.bind(this);
    this.generateFretContainers = this.generateFretContainers.bind(this);
    this.noteSelected = this.noteSelected.bind(this);
    this.getNoteFromBase = this.getNoteFromBase.bind(this);
    this.stringIsSet = this.stringIsSet.bind(this);
  }

  stringIsSet(stringNumber) {
    return this.props.chord[stringNumber - 1] !== -1;
  }
  getNoteFromBase(string,semitones){
    let stringNote = this.props.tuning[string-1];
    let interval = tonal.ivl.fromSemitones(semitones);
    let note = tonal.transpose(stringNote,interval);
    let pcnote = tonal.note.pc(note);
    return pcnote;
  }
  noteSelected(string,fret) {
    let newChord = this.props.chord.slice();
    let previousNote = this.props.chord[string -1];
    if(previousNote ===fret) {
      fret = -1;
    }
    newChord[string-1] = fret;
    this.props.chordChanged(newChord);
    this.props.playNote(string - 1 ,fret);
  }

  isActiveFret(stringNumber,fretNumber){
    if(this.props.chord[stringNumber-1] === fretNumber){
        return true;
    }
    return false;
  }


  generateFretContainers(fretNumber) {
    return (
      <FretContainer fret={fretNumber} >
        <Fret stringIsSet={this.stringIsSet(6)} noteText={this.props.getNoteText(6,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={6} fret={fretNumber} isActiveFret={this.isActiveFret(6,fretNumber)}/>
        <Fret stringIsSet={this.stringIsSet(5)} noteText={this.props.getNoteText(5,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={5} fret={fretNumber} isActiveFret={this.isActiveFret(5,fretNumber)}/>
        <Fret stringIsSet={this.stringIsSet(4)} noteText={this.props.getNoteText(4,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={4} fret={fretNumber} isActiveFret={this.isActiveFret(4,fretNumber)}/>
        <Fret stringIsSet={this.stringIsSet(3)} noteText={this.props.getNoteText(3,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={3} fret={fretNumber} isActiveFret={this.isActiveFret(3,fretNumber)}/>
        <Fret stringIsSet={this.stringIsSet(2)} noteText={this.props.getNoteText(2,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={2} fret={fretNumber} isActiveFret={this.isActiveFret(2,fretNumber)}/>
        <Fret stringIsSet={this.stringIsSet(1)} noteText={this.props.getNoteText(1,fretNumber)} noteSelected={(string,fret) => this.noteSelected(string, fret)} string={1} fret={fretNumber} isActiveFret={this.isActiveFret(1,fretNumber)}/>
      </FretContainer>
    )
  }
  render() {
    return (
      <table className="guitar-neck pull-left">
        <tbody>
        {this.generateFretContainers(0)}
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
