import React, { Component } from "react";
import GuitarNeck from "./GuitarNeck";
import Guitar from './karplus-strong/Guitar.js';
import getContext from './getContext.js';
import tonal from 'tonal';
import sharp11 from 'sharp11';
import Constants from './Constants';

export default class ChordFinderContainer extends Component {
constructor(props){
super(props);
let context = getContext();
this.state = {
  chord:[-1,-1,-1,-1,-1,-1],
  tuning:["E4","B3","G3","D3","A2","E2"],
  guitar:new Guitar(context,context.destination)
};
this.chordChanged = this.chordChanged.bind(this);
this.getChordSuggestion = this.getChordSuggestion.bind(this);
this.getNotesFromPositions = this.getNotesFromPositions.bind(this);
this.playNote = this.playNote.bind(this);
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
      let base = this.state.tuning[i];
      let interval = tonal.ivl.fromSemitones(value);
      let note = tonal.transpose(base,interval);
      let pcnote = tonal.note.pc(note);
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
    return(
    <div className="clearfix">
      <GuitarNeck chord={this.state.chord} tuning={this.state.tuning}
                 chordChanged={(newChord) => this.chordChanged(newChord)}
                playNote={(string,fret)=> this.playNote(string,fret)}
               />
   <h2 className="pull-left">
     {this.getChordSuggestion()}
   </h2>
    </div>
  )
  }
}
