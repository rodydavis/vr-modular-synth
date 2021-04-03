import * as THREE from "three";

export abstract class SceneObject {
  abstract create(): THREE.Object3D;
  update() {}
}
