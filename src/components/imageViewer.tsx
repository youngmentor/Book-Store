import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ImageViewerProps } from './interfaces/type.check';
const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    // Create a cube with a texture
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: any) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        cube.rotation.x = mouse.y * 2;
        cube.rotation.y = mouse.x * 2;
      }
    };

    document.addEventListener('mousemove', onMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [imageUrl]);

  return <div ref={containerRef} />;
};

export default ImageViewer;
