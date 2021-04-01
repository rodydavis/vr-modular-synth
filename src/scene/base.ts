import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

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
    window.addEventListener("mousemove", (e) => this.onMouseMove(e), false);

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

  select(): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    return intersects;
  }

  onMouseMove(event: { clientX: number; clientY: number }) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
