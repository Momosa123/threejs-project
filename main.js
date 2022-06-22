import './style.css'
import * as THREE from 'three'
import { GridHelper } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()

const zSaturne = 500
const ysaturne = 200
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(90)
camera.position.setX(70)

renderer.render(scene, camera)

const geometryOrange = new THREE.TorusGeometry(16, 0.75, 2, 100)
const materialOrange = new THREE.MeshStandardMaterial({color:0xFF6347})
const torusOrange = new THREE.Mesh(geometryOrange, materialOrange)
torusOrange.position.z = zSaturne
torusOrange.position.x = -30
torusOrange.position.y = ysaturne
scene.add(torusOrange)

const geometryBlue = new THREE.TorusGeometry(14, 0.75, 2, 100)
const materialBlue = new THREE.MeshStandardMaterial({color:0x189AB4})
const torusBlue  = new THREE.Mesh(geometryBlue, materialBlue)
torusBlue.position.z = zSaturne
torusBlue.position.x = -30
torusBlue.position.y = ysaturne
scene.add(torusBlue)

const geometryGray = new THREE.TorusGeometry(12, 0.75, 2, 100)
const materialGray = new THREE.MeshStandardMaterial({color:0xced4da})
const torusGray  = new THREE.Mesh(geometryGray, materialGray)
torusGray.position.z = zSaturne
torusGray.position.x = -30
torusGray.position.y = ysaturne
scene.add(torusGray)

const pointLight = new THREE.PointLight(0xFFFFFF)
const ambientLight = new THREE.AmbientLight(0xFFFFFF)
pointLight.position.set(5,5,5)
scene.add(pointLight, ambientLight)

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



const sunTexture = new THREE.TextureLoader().load('sun.jpeg')
 
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
    }
  )
)



scene.add(sun)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
    }
  )
)

moon.position.z = 30
moon.position.x = -10

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
saturne.position.x = -30
saturne.position.y = ysaturne
scene.add(saturne)

function moveCamera(){

  const top =document.body.getBoundingClientRect().top;
sun.rotation.x +=0.05
sun.rotation.y +=0.075
sun.rotation.z +=0.05

camera.position.z= top*0.05
camera.position.x= top*0.05

}

document.body.onscroll = moveCamera

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
  
  controls.update()
  renderer.render(scene, camera)
}

animate()