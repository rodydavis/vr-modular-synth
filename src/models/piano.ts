// import { SceneObject } from "./base";
// import * as THREE from "three";
// import { Cube } from "./cube";

// export class Piano extends SceneObject {
//   constructor() {
//     super();
//   }

//   create(): THREE.Object3D {
//     const group = new THREE.Group();
//     group.userData = { name: "Piano" };
//     group.position.set(-6, -5, -10);
//     for (let o = 2; o < 6; o++) {
//       const octave = getOctave(o);
//       for (let i = 0; i < octave.length; i++) {
//         const note = octave[i];
//         const pos = new THREE.Vector3(0, 0, 0);
//         const cube = new Cube(pos, { note: note });
//         pos.x += i * 2;
//         pos.y += o * 2;
//         group.add(cube.create());
//       }
//     }
//     this.move = (x, y, z) => {
//       group.position.set(x, y, z);
//     };
//     return group;
//   }

//   move(x: number, y: number, z: number) {}
// }

// function getOctave(octave: number) {
//   const notes: string[] = [
//     `C${octave}`,
//     `D${octave}`,
//     `E${octave}`,
//     `F${octave}`,
//     `G${octave}`,
//     `A${octave}`,
//     `B${octave}`,
//   ];
//   return notes;
// }
