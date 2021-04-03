import { SceneObject } from "./base";
import * as THREE from "three";

export class Cube extends SceneObject {
  constructor(
    public data: { [key: string]: any } = {},
    public pos: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    super();
  }

  create(): THREE.Object3D {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = this.data;
    mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    return mesh;
  }
}
