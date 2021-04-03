import { LitElement, html, customElement, css, query } from "lit-element";
import * as THREE from "three";
import { Synth } from "./audio/base";
import { Cube } from "./models/cube";
import { Scene } from "./scene/base";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100vh;
    }
    #octave {
      position: absolute;
      top: 10px;
      right: 10px;
      color: white;
    }
  `;
  synth = new Synth();

  async firstUpdated() {
    const scene = new Scene(this.canvas);
    scene.setup();

    const cube = new Cube({ note: "C4" });
    scene.add(cube);

    scene.camera.position.set(0, 0, 3);

    const handleNotes = (e: KeyboardEvent, play: boolean) => {
      let note = "";
      let offset = 0;
      if (e.key == "a") note = `c`;
      if (e.key == "w") note = `c#`;
      if (e.key == "s") note = `d`;
      if (e.key == "e") note = `d#`;
      if (e.key == "d") note = `e`;
      if (e.key == "f") note = `f`;
      if (e.key == "t") note = `f#`;
      if (e.key == "g") note = `g`;
      if (e.key == "y") note = `g#`;
      if (e.key == "h") note = `a`;
      if (e.key == "u") note = `a#`;
      if (e.key == "j") note = `b`;
      if (e.key == "k") {
        note = `c`;
        offset = 1;
      }
      if (play) {
        this.synth.playNote({ note, offset });
      } else {
        this.synth.stopNote({ note, offset });
      }
    };

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleNotes(e, true);
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      handleNotes(e, false);
      if (e.key == "z") {
        this.synth.octave -= 1;
        this.requestUpdate();
      }
      if (e.key == "x") {
        this.synth.octave += 1;
        this.requestUpdate();
      }
    });
  }

  @query("#vr-output") canvas!: HTMLCanvasElement;

  render() {
    return html`
      <div>
        <div id="octave">Octave: ${this.synth.octave}</div>
        <canvas id="vr-output"></canvas>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
