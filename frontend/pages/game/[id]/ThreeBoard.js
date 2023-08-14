// 18번 블록 위에 모델 위치
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from '@/styles/Three.module.css';

const ThreeBoard = ({pin}) => {

  console.log(pin)

  const boardRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    boardRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    const gltfLoader = new GLTFLoader();
    let gltfModel;
    let mixer;

    gltfLoader.load('/src/scene.gltf', (gltf) => {
      gltfModel = gltf.scene;
      gltfModel.scale.set(0.5, 0.5, 0.5);

      mixer = new THREE.AnimationMixer(gltfModel);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      scene.add(gltfModel);

      const blocks = [];
      const numRows = 7;
      const centerX = (numRows - 1) / 2;
      const centerZ = (numRows - 1) / 2;

      const blockSpacing = 1.2;
      const blockHeight = 0;

      let blockNumber = 1;
      let targetBlock = null; // 숫자 18이 적힌 블록

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRows; j++) {
          if (i === 0 || i === numRows - 1 || j === 0 || j === numRows - 1) {
            const geometry = new THREE.BoxGeometry(1, 0.1, 1);

            const materials = [
              new THREE.MeshPhongMaterial({ color: 0xCCCCCC }), // Front
              new THREE.MeshPhongMaterial({ color: 0xCCCCCC }), // Back
              new THREE.MeshPhongMaterial({ color: 0xffffff }), // Top
              new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Bottom
              new THREE.MeshPhongMaterial({ color: 0x999999 }), // Left
              new THREE.MeshPhongMaterial({ color: 0x00ffff })  // Right
            ];

            const block = new THREE.Mesh(geometry, materials);
            block.position.x = j - centerX;
            block.position.z = i - centerZ;

            block.position.y = blockHeight / 2;
            block.position.x *= blockSpacing;
            block.position.z *= blockSpacing;

            if (blockNumber === 18) {
              targetBlock = block;
            }

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 64;
            context.fillStyle = 'black';
            context.font = 'Bold 10px Arial';
            context.fillText(blockNumber.toString(), canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(block.position.x, block.position.y + 0.2, block.position.z);
            sprite.scale.set(1.0, 1.0, 1.0);

            scene.add(block);
            scene.add(sprite);

            blocks.push(block);
            blockNumber++;
          }
        }
      }

      if (targetBlock) {
        gltfModel.position.set(targetBlock.position.x, targetBlock.position.y + blockHeight, targetBlock.position.z);
      }

      const animate = () => {
        requestAnimationFrame(animate);
        if (mixer) {
          mixer.update(0.01);
        }

        renderer.render(scene, camera);
      };

      animate();
    });

  }, [pin]);

  return <div className={styles.board} ref={boardRef} />;
};

export default ThreeBoard;
