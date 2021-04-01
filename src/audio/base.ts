import * as Tone from "tone";

export class Synth {
  synth = new Tone.Synth().toDestination();

  playNote(note: string = "C4", duration: string = "8n") {
    this.synth.triggerAttackRelease(note, duration);
  }
}
