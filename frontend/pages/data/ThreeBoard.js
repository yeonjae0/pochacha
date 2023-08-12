import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from '@/styles/Three.module.css';

const getRandomColor = () => {
  return Math.random() * 0xffffff;
};

const ThreeBoard = () => {
  const boardRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.setSize(window.innerWidth, window.innerHeight);
    boardRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const pointLight = new THREE.PointLight(0xffffff, 2.5);
    pointLight.position.set(5, 10, 5);
    scene.add(ambientLight, pointLight);













    ////////////////////////////////////
// Load GLTF model with animations
const gltfLoader = new GLTFLoader();
let gltfModel;
let mixer;

gltfLoader.load('/src/scene.gltf', (gltf) => {
  gltfModel = gltf.scene;

  // Adjust model scale and position
  gltfModel.scale.set(0.01, 0.01, 0.01); // Adjust the scale
  gltfModel.position.y = 0.25; // Adjust the vertical position

  // Create an animation mixer
  mixer = new THREE.AnimationMixer(gltfModel);

  // Add animations to the mixer
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  scene.add(gltfModel);
});

// Inside the animate function
// const animate = () => {
//   requestAnimationFrame(animate);

//   // Update the animation mixer
//   if (mixer) {
//     mixer.update(0.01); // You can adjust the time step as needed
//   }

//   renderer.render(scene, camera);
// };

// animate();

    ////////////////////////////////////////













    // Create Blocks
    const blocks = [];
    const numRows = 7;
    const centerX = (numRows - 1) / 2;
    const centerZ = (numRows - 1) / 2;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numRows; j++) {
        if (i === 0 || i === numRows - 1 || j === 0 || j === numRows - 1) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);

          const materials = [
            new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Front
            new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Back
            new THREE.MeshPhongMaterial({ color: getRandomColor() }), // Top
            new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Bottom
            new THREE.MeshPhongMaterial({ color: 0xff00ff }), // Left
            new THREE.MeshPhongMaterial({ color: 0x00ffff })  // Right
          ];

          const block = new THREE.Mesh(geometry, materials);
          block.position.x = j - centerX;
          block.position.z = i - centerZ;
          scene.add(block);

          // Check if the block should have the GLTF model on top
          if (Math.random() < 0.04 && gltfModel) {
            const modelClone = gltfModel.clone();
            modelClone.position.copy(block.position);
            modelClone.position.y += 0.5; // Adjust the model position on top of the block
            scene.add(modelClone);
          }
        }
      }
    }

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div className={styles.board} ref={boardRef} />;
};

export default ThreeBoard;
