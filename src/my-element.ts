import { LitElement, html, customElement, css, query } from "lit-element";
import * as THREE from "three";
import { Synth } from "./audio/base";
import { Scene } from "./scene/base";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100vh;
    }
  `;

  async firstUpdated() {
    const scene = new Scene(this.canvas);
    scene.setup();
    const getOctave = (octave: number) => {
      const notes: string[] = [
        `C${octave}`,
        `D${octave}`,
        `E${octave}`,
        `F${octave}`,
        `G${octave}`,
        `A${octave}`,
        `B${octave}`,
      ];
      return notes;
    };
    for (let o = 2; o < 6; o++) {
      const octave = getOctave(o);
      for (let i = 0; i < octave.length; i++) {
        const note = octave[i];
        const box = scene.addObject({ note: note });
        box.position.set(-6, -5, -10);
        box.position.x += i * 2;
        box.position.y += o * 2;
      }
    }

    scene.camera.position.set(0, 0, 3);

    const synth = new Synth();
    this.canvas.addEventListener("click", () => {
      const selection = scene.select();
      for (const item of selection) {
        if (item.object instanceof THREE.Mesh) {
          const obj = item.object;
          obj.material.color.set(0xff0000);
          synth.playNote(obj.userData["note"]);
          setTimeout(() => {
            obj.material.color.set(0x00ff00);
          }, 500);
        }
      }
    });
  }

  @query("#vr-output") canvas!: HTMLCanvasElement;

  render() {
    return html`
      <div>
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
