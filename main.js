import './style.css'
import * as THREE from 'three'
import { GridHelper, SphereBufferGeometry } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

const scene = new THREE.Scene()
import vShader from './vertexShader.glsl'
import fShader from './fragmentShader.glsl'
const xSaturne= 500
const zSaturne = 0
const ysaturne = 250
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(-200)
camera.position.setX(-70)

renderer.render(scene, camera)

const geometryOrange = new THREE.TorusGeometry(16, 0.75, 2, 100)
const materialOrange = new THREE.MeshStandardMaterial({color:0xFF6347})
const torusOrange = new THREE.Mesh(geometryOrange, materialOrange)
torusOrange.position.z = zSaturne
torusOrange.position.x = xSaturne
torusOrange.position.y = ysaturne
scene.add(torusOrange)


const otherGeometryOrange = new THREE.TorusGeometry(600, 30, 100, 100)

const otherTorusOrange = new THREE.Mesh(otherGeometryOrange, materialOrange)
otherTorusOrange.position.z = -50
otherTorusOrange.position.x = 0
otherTorusOrange.position.y = -100
scene.add(otherTorusOrange)


const geometryBlue = new THREE.TorusGeometry(14, 0.75, 2, 100)
const materialBlue = new THREE.MeshStandardMaterial({color:0x189AB4})
const torusBlue  = new THREE.Mesh(geometryBlue, materialBlue)
torusBlue.position.z = zSaturne
torusBlue.position.x = xSaturne
torusBlue.position.y = ysaturne
scene.add(torusBlue)

const geometryGray = new THREE.TorusGeometry(12, 0.75, 2, 100)
const materialGray = new THREE.MeshStandardMaterial({color:0xced4da})
const torusGray  = new THREE.Mesh(geometryGray, materialGray)
torusGray.position.z = zSaturne
torusGray.position.x = xSaturne
torusGray.position.y = ysaturne
scene.add(torusGray)

const pointLight = new THREE.PointLight(0xFFFFFF)
const ambientLight = new THREE.AmbientLight(0xFFFFFF)
pointLight.position.set(5,5,5)
scene.add(pointLight, ambientLight)

//bloom renderer
// const renderScene = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1.5,
//   0.4,
//   0.85
// );
// bloomPass.threshold = 0;
// bloomPass.strength = 2; //intensity of glow
// bloomPass.radius = 0;
// const bloomComposer = new EffectComposer(renderer);
// bloomComposer.setSize(window.innerWidth, window.innerHeight);
// bloomComposer.renderToScreen = true;
// bloomComposer.addPass(renderScene);
// bloomComposer.addPass(bloomPass);

// // const color = new THREE.Color("#FDB813");
// const Icogeometry = new THREE.IcosahedronGeometry(10, 15);
// const Icomaterial = new THREE.MeshStandardMaterial({ color: 0xFDB813 });
// const sphere = new THREE.Mesh(Icogeometry, Icomaterial);
// sphere.position.z = 0
// sphere.position.x = 0
// sphere.position.y = 0
// // sphere.layers.set(10);
// scene.add(sphere);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color:0xFFFFFF})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z);
  scene.add(star)
}

// Array(300).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
scene.background = spaceTexture



const cubePicture = new THREE.TextureLoader().load('IMG_1904.jpg')
const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(60,60,60),
  new THREE.MeshStandardMaterial({
    map: cubePicture
    }
  )
)

 

cubeMesh.position.z = 150
cubeMesh.position.x = -250
cubeMesh.position.y = 130

scene.add(cubeMesh)

//adding the sun
const sunTexture = new THREE.TextureLoader().load('sun.jpeg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(70, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
    }
  )
)


scene.add(sun)

//add glowing sun



const earthTexture = new THREE.TextureLoader().load('earth.jpg')
 
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
    }
  )
)

earth.position.z = 50
earth.position.x = -80
earth.position.y = 0

scene.add(earth)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
    }
  )
)

moon.position.z = 50
moon.position.x = -80
moon.position.y = 0

scene.add(moon)

const saturneTexture = new THREE.TextureLoader().load('saturne.jpg')


const saturne = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturneTexture,
    normalMap: normalTexture
    }
  )
)

saturne.position.z = zSaturne
saturne.position.x = xSaturne
saturne.position.y = ysaturne
scene.add(saturne)

function moveCamera(){

  const top =document.body.getBoundingClientRect().top;
sun.rotation.x +=0.05
sun.rotation.y +=0.075
sun.rotation.z +=0.05

camera.position.z= -200+top*0.05
camera.position.x= -90+top*0.05

}

document.body.onscroll = moveCamera
const clock = new THREE.Clock()
let time = 0
function animate(){
  requestAnimationFrame(animate);

  torusOrange.rotation.x+=0.01;
  torusOrange.rotation.y+=0.005;
  torusOrange.rotation.z+=0.01;
  torusBlue.rotation.x+=0.01;
  torusBlue.rotation.y+=0.005;
  torusBlue.rotation.z+=0.01;
  torusGray.rotation.x+=0.01;
  torusGray.rotation.y+=0.005;
  torusGray.rotation.z+=0.01;

  otherTorusOrange.rotation.y+=0.005;
  cubeMesh.rotation.x+=0.01;
  cubeMesh.rotation.y+=0.005;
  cubeMesh.rotation.z+=0.01;
 
  earth.rotation.y+=0.01;
  
  time = clock.getElapsedTime() * 0.1 * Math.PI;
  moon.position.x= -80 + Math.sin(time + Math.PI * 0.5 ) * 40
  moon.position.z= 50 + Math.cos(time + Math.PI * 0.5 ) * 40
   
  controls.update()
  // bloomComposer.render();
  renderer.render(scene, camera)
}

animate()

