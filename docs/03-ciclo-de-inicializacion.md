1. main.ts crea la aplicación Vue.

2. App.vue monta Home.vue.

3. Home.vue obtiene la referencia del <canvas>.

4. Home.vue llama a three.init(canvas).

5. three.init espera a que resources emita "ready".

6. Cuando los recursos están listos:
   - threeSizes.init()
   - camera.init()
   - renderTarget.init()
   - renderer.init()
   - objects.init()
   - raycast.init()

7. El renderer comienza a dibujar la escena.