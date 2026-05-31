import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('monolithe-canvas');

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(500, 700);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 300 / 500, 0.1, 100);
camera.position.set(0, 0, 8); // au lieu de 5
const lumierePrincipale = new THREE.DirectionalLight(0xffffff, 0.5);
lumierePrincipale.position.set(1, 2, 3);
scene.add(lumierePrincipale);

const lumiereAmbiance = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(lumiereAmbiance);

const lumierePulse = new THREE.PointLight(0x88ddff, 0, 10);
scene.add(lumierePulse);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('medias/materiaux.png');

const loader = new GLTFLoader();
let monolithe = null;

loader.load('medias/monolithe.glb',
    (gltf) => {
        monolithe = gltf.scene;
        monolithe.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture;
                child.material.emissiveIntensity = 0.2;
                child.material.needsUpdate = true;
            }
        });
        scene.add(monolithe);
        console.log('GLB chargé !');
    },
    (progress) => {
        console.log('Chargement...', progress.loaded / progress.total * 100 + '%');
    },
    (error) => {
        console.error('Erreur GLB :', error);
    }
);

function pulse() {
    gsap.to(lumierePulse, {
        intensity: 5,
        duration: 1,
        ease: 'power2.in',
        onComplete: () => {
            gsap.to(lumierePulse, {
                intensity: 0,
                duration: 2,
                ease: 'power2.out'
            });
        }
    });
}

setInterval(pulse, 47000);

function animate() {
    requestAnimationFrame(animate);
    if (monolithe) {
        monolithe.rotation.y += 0.003;
    }
    renderer.render(scene, camera);
}

animate();

window.pulse = pulse;