import * as THREE from "three";
import { Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { SceneObject } from "../models/base";

export class Scene {
  constructor(public canvas: HTMLCanvasElement) {}
  scene = new THREE.Scene();
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setup() {
    window.addEventListener("mousemove", (e) => this.onMouse(e), false);
    // window.addEventListener("mousedown", (e) => this.onMouse(e), false);
    // window.addEventListener("touchend", (e) => this.onTouch(e), false);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));

    const controls = new OrbitControls(this.camera, this.canvas);

    this.camera.position.set(0, 0, 0);
    controls.update();

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(this.scene, this.camera);
    });
  }

  select(event?: { clientX: number; clientY: number }): THREE.Intersection[] {
    if (event) {
      this.mouse = new Vector2(event.clientX, event.clientY);
    }
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    return intersects;
  }

  onMouse(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  onTouch(event: TouchEvent) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
  }

  _objects: SceneObject[] = [];
  add(val: SceneObject) {
    this._objects.push(val);
    this.scene.add(val.create());
  }

  addObject(data: { [key: string]: any } = {}): THREE.Object3D {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.userData = data;
    this.scene.add(cube);
    return cube;
  }
}
