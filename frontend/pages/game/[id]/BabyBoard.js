import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import '@babylonjs/loaders';

const BabylonBoard = ({ pin }) => {

  console.log('pin -------------->', pin)
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Set the clear color to transparent
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Create camera
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 3, Math.PI / 2.5, 20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Set camera upper radius limit to control zoom-out
    camera.upperRadiusLimit = 30;

    // Create light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;

    // Create the game board
    const numRows = 7;
    const tileSize = 2; // Increase tileSize for larger spacing
    const halfSize = Math.floor(numRows / 2);
    const gapSize = 0.5; // Gap between blocks

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numRows; j++) {
        const box = BABYLON.MeshBuilder.CreateBox('box', { size: tileSize, height: tileSize / 4 }, scene);
        box.position.x = (j - halfSize) * (tileSize + gapSize);
        box.position.y = tileSize / 4 + gapSize; // Adjust vertical position with gap
        box.position.z = (i - halfSize) * (tileSize + gapSize);

        // Apply random color material
        const material = new BABYLON.StandardMaterial('material', scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        box.material = material;

        // Create a sphere (circle) on top of the box
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
        sphere.position = new BABYLON.Vector3(box.position.x, box.position.y + tileSize / 2, box.position.z);
        sphere.material = new BABYLON.StandardMaterial('sphereMaterial', scene);

        // Set sphere material color based on pin value
        if (i * numRows + j + 1 === pin) {
          sphere.material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue color for the selected block
        } else {
          sphere.material.alpha = 0; // Make the sphere transparent for other blocks
        }
      }
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        engine.resize();
      });
      engine.dispose();
    };
  }, [pin]);

  return <canvas style={{ width: '1000px' }} ref={canvasRef} />;
};

export default BabylonBoard;
