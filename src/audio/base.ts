import * as Tone from "tone";

export interface NoteData {
  note: string;
  offset: number;
}

export class Synth {
  synth = new Tone.PolySynth().toDestination();
  octave = 4;
  current: NoteData[] = [];

  playNote(props: NoteData) {
    for (const item of this.current) {
      if (item.note === props.note && item.offset === props.offset) {
        return;
      }
    }
    this.current.push(props);
    this.synth.triggerAttack(
      `${props.note}${this.octave + props.offset}`,
      Tone.context.currentTime
    );
  }

  stopNote(props: NoteData) {
    for (let i = 0; i < this.current.length; i++) {
      const item = this.current[i];
      if (item.note === props.note && item.offset === props.offset) {
        this.current.splice(i, 1);
      }
    }
    this.synth.triggerRelease(
      `${props.note}${this.octave + props.offset}`,
      Tone.context.currentTime
    );
  }
}
