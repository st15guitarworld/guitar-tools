import React, { Component } from "react";
import generateNote from './generateNote';
import GuitarNeck from './GuitarNeck';
import sharp11 from 'sharp11';
import Constants from './Constants';


let notesByAccent = (array,accidental) => {
  return array.map(function(note){
    return sharp11.note.create(note).withAccidental(accidental).name
  });
}
let buildSelectStatement = (array,refFunc,onSelect) => {
  return (
    <select ref={ refFunc } onChange={onSelect}>
        { array.map(function(element){
          return <option value={element}>{element}</option>
        })
        }
  </select>
)
}

export default class ScalesContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      chord:[-1,-1,-1,-1,-1,-1],
      tuning:["E4","B3","G3","D3","A2","E2"],
      accidental:'#',
      scaleNotes:[],
      key:"C",
      scaleName:'Major'
    };

    this.isActiveFret = this.isActiveFret.bind(this);
    this.buildAccidentalButton = this.buildAccidentalButton.bind(this);
    this.changeAccidental = this.changeAccidental.bind(this);
    this.keySelectOnChange = this.keySelectOnChange.bind(this);
    this.ScaleSelectOnChange = this.ScaleSelectOnChange.bind(this);
  }
ScaleSelectOnChange(input) {
  let selectedItem = this.scale[this.scale.selectedIndex].innerHTML;
  this.setState({scaleName:selectedItem});
}
keySelectOnChange() {
  let selectedItem = this.keySelect[this.keySelect.selectedIndex].innerHTML;
  this.setState({key:selectedItem});
}
  isActiveFret(string, fretNumber) {
    let note = generateNote(string,fretNumber,this.state.tuning,this.state.accidental);
    return sharp11.scale.create(this.state.key, this.state.scaleName).contains(note);
  }
  buildAccidentalButton(){
    if(this.state.accidental === '#'){
      return (<span><strong>#</strong><strong>⇄</strong>b</span>);
    } else {
      return (<span>#<strong>⇄</strong><span><strong>b</strong></span></span>);
    }
  }
  changeAccidental(ac) {
    this.setState({accidental:ac});
  }

  render() {
    return <div className="clearfix">
      <GuitarNeck chord={this.state.chord} tuning={this.state.tuning}
                getNoteText={(string,fretNumber) => { return generateNote(string,fretNumber,this.state.tuning,this.state.accidental)}}
                 chordChanged={(newChord) =>{} }
                playNote={(string,fret)=> {}}
                stringIsSet={()=> {return true}}
                isActiveFret={(string,fretNumber) => {return this.isActiveFret(string,fretNumber)}}
               />
               <ul className="chord-finder-buttons pull-left">
                 <li>
                   {buildSelectStatement(notesByAccent(Constants.NOTES,this.state.accidental),el => this.keySelect = el ,this.keySelectOnChange)}
                   {buildSelectStatement(Constants.SCALES,el => this.scale = el,this.ScaleSelectOnChange)}
                   <button onClick={()=>{if(this.state.accidental === "#"){this.changeAccidental("b");} else{this.changeAccidental("#");} }}>{this.buildAccidentalButton()}</button>
                 </li>

               </ul>
          </div>
  }
}
