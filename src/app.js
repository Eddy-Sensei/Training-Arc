import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import './style.css'

//Loading Manager 
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart =()=>{}

//Textures
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/color.jpg')
const alphaTexture = textureLoader.load('/alpha.jpg')
const normalTexture = textureLoader.load('/normal.jpg')
const metalnessTexture = textureLoader.load('/metalness.jpg')
const roughnessTexture = textureLoader.load('/roughness.jpg')
const ambientTexture = textureLoader.load('/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/height.jpg')
/*
colorTexture.repeat.x = 3

colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT= THREE.MirroredRepeatWrapping

colorTexture.offset.y = 0.5

colorTexture.rotation = Math.PI/4
colorTexture.center.x = 0.5

colorTexture.magFilter = THREE.NearestFilter
*/
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter

//DAT.GUI Console
const gui = new dat.GUI({ closed : true, width: 400})
gui.hide()
const debugObjects ={ 
    color: 0xffff00,
    spin: () => {
        console.log('spin')
    } 
} 

gui
    .addColor(debugObjects, 'color')
    .onChange(() => {
    cubeMaterial.color.set(debugObjects.color)
    })
    .name('Cube Color')

gui
    .add(debugObjects,'spin')

// Cursor
const cursor = { x: 0, y:0}
window.addEventListener("mousemove",(event) => {
    cursor.x=event.clientX/sizes.width -0.5
    cursor.y=-(event.clientY/sizes.height -0.5)
    // console.log(cursor.x, cursor.y)
})
// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Objects
const cubes = new THREE.Group()
cubes.rotation.x = Math.PI * 0.25
cubes.position.set(0, 0, 0)

// Object Properties
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ffff00'
})

const hemisphereGeometry = new THREE.BoxGeometry(2, 6, 2)
const hemisphereMaterial = new THREE.MeshBasicMaterial({
    map: colorTexture
})

//Object Instances
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.position.set(2.5, 0, 0)
const cube2Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube2Mesh.position.set(-2.5, 0, 0)
cubes.add(cubeMesh)
cubes.add(cube2Mesh)

const hemisphereMesh = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial)
hemisphereMesh.position.set(0, -2, 0)
cubes.add(hemisphereMesh)

//Object Axes Helper (blue: z orange: x green: y)
const axis1 = new THREE.AxesHelper(2)
axis1.position.set(2.5, 0, 0)
const axis2 = new THREE.AxesHelper(2) 
axis2.position.set(-2.5, 0, 0)


cubes.add(axis1)
cubes.add(axis2)


scene.add(cubes)

//Cubes Debug
gui
    .add(hemisphereMesh, 'visible')
    .name('Moon')

// Camera
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height,0.1 ,250)
// const camera = new THREE.OrthographicCamera(-5 * (sizes.width/sizes.height),5 * (sizes.width/sizes.height),5,-5,0.1,250)
camera.position.set(2, 2, 3)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Time
const clock = new THREE.Clock()

// Animation
const animate = () => {
    // Frames
    const deltaTime = clock.getElapsedTime()
    // cubes.rotation.y += deltaTime * Math.PI * 0.25
    cubes.position.y = Math.sin(deltaTime * Math.PI * 0.25)

    // camera.position.set(  //10 is the amptitude
    //     Math.sin(cursor.x * Math.PI * 2) *4,
    //     cursor.y*10,
    //     Math.cos(cursor.x * Math.PI * 2) *4)
    // camera.lookAt(cubes.position)

    window.requestAnimationFrame(animate)
    controls.update()

    
    renderer.render(scene, camera)
}

animate()