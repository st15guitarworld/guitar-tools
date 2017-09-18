import tonal from 'tonal'
import sharp11 from 'sharp11';

export default function generateNote(string,semitones,tuning,accidental){
  let stringNote = tuning[string-1];
  let interval = tonal.ivl.fromSemitones(semitones);
  let note = tonal.transpose(stringNote,interval);
  let pcnote = tonal.note.pc(note);
  return sharp11.note.create(pcnote).withAccidental(accidental).name//.withAccidental(accidental).name();
  //return pcnote;
}
