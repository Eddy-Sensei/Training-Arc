import * as THREE from 'three'

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

const hemisphereGeometry = new THREE.SphereGeometry(2, 16, 16)
const hemisphereMaterial = new THREE.MeshBasicMaterial({
    color: '#999999'
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


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(2, 2, 3)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

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

    window.requestAnimationFrame(animate)
    cubes.rotation.y += deltaTime * Math.PI * 0.25
    cubes.position.y = Math.sin(deltaTime * Math.PI * 0.25)
    renderer.render(scene, camera)
}

animate()