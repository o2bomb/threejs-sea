import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import waterVertexShader from "./shaders/vertex.glsl";
import waterFragmentShader from "./shaders/fragment.glsl";

import "./style.css";

window.addEventListener("load", init, false);

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

function init() {
  // document.addEventListener("mousemove", handleMouseMove, false);
  window.addEventListener(
    "resize",
    () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;

      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    },
    false
  );

  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const aspectRatio = window.innerWidth / window.innerHeight;
  const fieldOfView = 60;
  const nearPlane = 0.1;
  const farPlane = 100;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.set(1, 1, 1);

  // RENDERER
  const canvas = document.querySelector<HTMLCanvasElement>("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // CONTROLS
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;

  // PLANE
  const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      uTime: { value: 0.0 }
    }
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI * 0.5;
  scene.add(water);

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    water.material.uniforms.uTime.value = elapsedTime;
    orbitControls.update();

    renderer.render(scene, camera);
  };
  animate();
}
