import React, { Component } from "react";
import GuitarNeck from "./GuitarNeck";
import Guitar from './karplus-strong/Guitar.js';
import getContext from './getContext.js';
import tonal from 'tonal';
import sharp11 from 'sharp11';
import Constants from './Constants';
import generateNote from './generateNote';

export default class ChordFinderContainer extends Component {
constructor(props){
super(props);
let context = getContext();
this.state = {
  chord:[-1,-1,-1,-1,-1,-1],
  tuning:["E4","B3","G3","D3","A2","E2"],
  guitar:new Guitar(context,context.destination),
  accidental:'#'
};
this.chordChanged = this.chordChanged.bind(this);
this.getChordSuggestion = this.getChordSuggestion.bind(this);
this.getNotesFromPositions = this.getNotesFromPositions.bind(this);
this.playNote = this.playNote.bind(this);
this.changeAccidental = this.changeAccidental.bind(this);
this.moveUp = this.moveUp.bind(this);
this.moveDown = this.moveDown.bind(this);
this.strumChord = this.strumChord.bind(this);
this.buildAccidentalButton = this.buildAccidentalButton.bind(this);
}
buildAccidentalButton(){
  if(this.state.accidental === '#'){
    return (<span><strong>#</strong><strong>⇄</strong>b</span>);
  } else {
    return (<span>#<strong>⇄</strong><span><strong>b</strong></span></span>);
  }
}
strumChord() {
    this.state.guitar.strumChord(0,1,true,this.state.chord);
}

moveUp() {
let chordCopy = JSON.parse(JSON.stringify(this.state.chord));
for (var i = 0; i < chordCopy.length; i++) {
if(chordCopy[i] < 0) {
  continue;
}
  chordCopy[i] = chordCopy[i] - 1;
if (chordCopy[i] < 0) {
  return;
}

}
this.setState({chord:chordCopy});
}
moveDown() {
  let chordCopy = JSON.parse(JSON.stringify(this.state.chord));
  for (var i = 0; i < chordCopy.length; i++) {
  if(chordCopy[i] < 0) {
    continue;
  }
    chordCopy[i] = chordCopy[i] + 1;
    if (chordCopy[i] > 12) {
      return;
    }
  }
  this.setState({chord:chordCopy});
}
changeAccidental(ac) {
  this.setState({accidental:ac});
}
playNote(string, fret) {
  if(fret > Constants.MUTED_STRING){
    this.state.guitar.playNote(string,0,1,fret);
  }
}
getNotesFromPositions(){
    let notes = [];
    this.state.chord.forEach((value,i)=>{
      if(value === -1 ) return;
      let pcnote = generateNote(i + 1,value,this.state.tuning,this.state.accidental);
      notes.push(pcnote);
    });
    return notes.reverse();
}

getChordSuggestion(){
  let suggestedChordText = "";
  let filteredChord = this.getNotesFromPositions();
  if(typeof filteredChord == "undefined" || filteredChord == null || filteredChord.length <= 0) return suggestedChordText;
  let suggestedChord = sharp11.chord.identify(...filteredChord);
  suggestedChordText+= suggestedChord;
  return suggestedChordText;
}
chordChanged(newChord){
this.setState({chord:newChord})
}


  render() {
    let accidentalButtonText = this.state.accidental === '#' ? "To flats " : "To sharps";
    return(
    <div className="clearfix">
      <GuitarNeck chord={this.state.chord} tuning={this.state.tuning}
                getNoteText={(string,fretNumber) => {return generateNote(string,fretNumber,this.state.tuning,this.state.accidental)}}
                 chordChanged={(newChord) => this.chordChanged(newChord)}
                playNote={(string,fret)=> this.playNote(string,fret)}
               />
    <ul className="chord-finder-buttons pull-left">
      <li style={{flexBasis:'3.8em'}}>
        <h3 className="chord-label">
        {this.getChordSuggestion()}
        </h3>
      </li>
      <li><button onClick={this.strumChord}>Play</button></li>
      <li><button onClick={()=>{if(this.state.accidental === "#"){this.changeAccidental("b");} else{this.changeAccidental("#");} }}>{this.buildAccidentalButton()}</button></li>
      <li><button onClick={this.moveUp}>Up</button></li>
      <li><button onClick={this.moveDown}>Down</button></li>
    </ul>

    </div>
  )
  }
}
