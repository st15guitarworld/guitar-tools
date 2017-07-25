/* eslint import/no-webpack-loader-syntax: off */
import AudioContextMonkeyPatch from "./AudioContextMonkeyPatch.js";
var MetronomeWorker = require("worker-loader!./metronomeWorker.js");

export default function metronome() {
  let audioContext = null;
  let isPlaying = false; // is the metronomePlaying?
  let startTime; // the start time of the sequence
  let current16thNote; // what note is currently last scheduled
  let tempo = 120.0; // tempo (in beatsper-minute (BPM))
  let lookahead = 25.0; // How frequently to call scheduling function (milliseconds)

  let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  // this is calculated from lookeahead, and overlaps
  // wih next interval (in case the tier is late)
  let nextNoteTime = 0.0; // When the next note is due.
  let noteResolution = 2; // 0 == 16th, 1 == 8th, 2 == quarter note
  let noteLength = 0.05; // Length of "beep" in seconds.

  let timeWorker = null; // The Web worker used to fire timer messages.
  let drawId = null;
  // First, let's shim the requestAnimationFrame API, with a setTimeout fallback
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  let nextNote = () => {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT
    // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat; // Add beat length to last beat time

    current16thNote++; // Advance the beat number, wrap to zero
    if (current16thNote === 16) {
      current16thNote = 0;
    }
  };

  let noteIsPlayable = beatNumber => {
    if (noteResolution === 1 && beatNumber % 2) return false; // we're not playing non-8th 16th notes
    if (noteResolution === 2 && beatNumber % 4) return false; // we're not playing non-quarter 8th notes

    return true;
  };

  let scheduleNote = (beatNumber, time) => {
    if (!noteIsPlayable(beatNumber)) {
      return;
    }

    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    if (
      beatNumber % 16 ===
      0 // beat 0 == high pitch
    )
      osc.frequency.value = 900.0;
    else if (
      beatNumber % 4 ===
      0 // quarter notes = medium pitch
    )
      osc.frequency.value = 440.0; // other 16th notes = low pitch
    else osc.frequency.value = 220.0;

    osc.start(time);
    osc.stop(time + noteLength);
  };

  let scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer;
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(current16thNote, nextNoteTime);
      nextNote();
    }
  };

  let init = () => {
    audioContext = new AudioContext();

    timeWorker = new MetronomeWorker();
    timeWorker.onmessage = e => {
      if (e.data === "tick") {
        scheduler();
      } else {
        console.log("message: " + e.data);
      }
    };
    timeWorker.postMessage({ interval: lookahead, type: "interval" });
  };

  let play = () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      // start playing
      current16thNote = 0;
      nextNoteTime = audioContext.currentTime;
      timeWorker.postMessage({ type: "start" });
      return "stop";
    } else {
      timeWorker.postMessage({ type: "stop" });
      return "play";
    }
  };

  let draw = (callback, brexit) => {
    if (isPlaying && noteIsPlayable(current16thNote)) {
      callback();
    } else {
      if (brexit && typeof brexit === "function") {
        brexit();
      }
    }
    drawId = requestAnimationFrame(() => {
      draw(callback, brexit);
    });
  };

  let setBpm = newBpm => {
    tempo = newBpm;
  };
  let getBpm = () => {
    return tempo;
  };
  let undraw = () => {
    if (drawId) {
      cancelAnimationFrame(drawId);
    }
  };
  return {
    init: init,
    play: play,
    setBpm: setBpm,
    getBpm: getBpm,
    isPlaying: isPlaying,
    draw: draw,
    undraw: undraw
  };
}
