main.ts → App.vue → Home.vue → three.init() → resources.once("ready") → inicializar cámara, renderer, objetos...

main.ts
    ↓
App.vue
    ↓
Home.vue
    ↓
three.init(canvas)
    ↓
Resources
    ↓
Camera
Renderer
Objects
Animations





Scroll
      │
      ▼
ScrollTrigger
      │
      ▼
Timeline GSAP
      │
      ▼
sceneWeightsInOut
      │
      ▼
scenes.tick()
      │
      ▼
sceneWeights
      │
      ▼
waypoints.tick()
      │
      ▼
camera.tick()
      │
      ▼
renderer.tick()
      │
      ▼
WebGLRenderer.render()



App.vue
   │
   ▼
Home.vue
   │
   ▼
three.init(canvas)
   │
   ▼
camera.init()
renderer.init()
objects.init()
   │
   ▼
GSAP ticker
   │
   ├── camera.tick()
   ├── renderer.tick()
   ├── room.tick()
   ├── waypoints.tick()
   └── scenes.tick()


   Usuario hace scroll
      │
      ▼
ScrollTrigger
      │
      ▼
Timeline GSAP
      │
      ▼
sceneWeightsInOut
      │
      ▼
sceneWeights
      │
      ▼
waypoints
      │
      ▼
camera
      │
      ▼
renderer.render()