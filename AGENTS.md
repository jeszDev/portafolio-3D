# AGENTS.md

SPA de portafolio personal. Vue 3 + TypeScript + Vite. Escenas 3D (three.js + GLSL), motion con GSAP/Lenis, audio con Howler. Sin backend.

## Comandos

```bash
npm run dev       # vite en puerto 3000 con strictPort (falla si el 3000 está ocupado)
npm run typecheck # vue-tsc -b — ejecutar tras cada cambio
npm run build     # vue-tsc -b && vite build -> dist/
npm run env:copy-example  # shx: copia .env.example -> .env si no existe
```

- No hay tests, ni script de lint, ni CI. Prettier está instalado (`.prettierrc`, printWidth 120, comillas dobles, punto y coma) pero sin script: usar `npx prettier --write <archivos>`.
- Los scripts `env:*` usan `shx` a propósito para funcionar en shells de Windows.

## Routing: no hay vue-router

`src/composables/useRouter.ts` solo envuelve `history.pushState/replaceState/back`. `useRouteObserver.ts` parchea `history.pushState`/`replaceState` para disparar un evento `route-change` y mantiene un `ref` global `path`. Consecuencias:

- Solo existe una ruta real: `/project/<slug>` (regex `isProjectRoute`). Cualquier otra ruta renderiza Home.
- Hacer deep-link a `/project/<slug>` en un host estático requiere rewrite SPA hacia `index.html`.
- `projectId`, `recentProjectId` y `projectVisible` son computeds a nivel de módulo: importarlos, no recrear el estado de routing.

## Agregar o modificar un proyecto

Tres lugares deben coincidir exactamente:

1. `src/content/projects/{es,en}/<slug>.ts` — `export default` de tipo `ProjectContent` (ver `src/content/types.ts`).
2. `src/content/projects/index.ts` — el slug debe estar en `projectIds` (de ahí sale también el tipo `ProjectId`).
3. `src/content/projects/previews/{es,en}.ts` — el `slug` del preview es el que genera los enlaces `/project/<slug>`.

- Actualmente hay 4 proyectos activos alineados en ambos locales: `latidos`, `online-complaints`, `acceius` y `chain-of-custody`.
- Cada proyecto debe existir en ambos idiomas (`es/` y `en/`). La falta de un archivo en algún locale deja la página vacía ya que no hay fallback automático.
- `ProjectComponent` es una unión cerrada (`imageText | text | list | media`); para agregar un tipo de sección hay que editar `src/features/projects/types.ts` **y** el dispatch en `ProjectComponent.vue`.
- Los `tags` del contenido son claves de `TagVariant`; los tags nuevos van en `src/components/tagVariants.ts` (tanto en la unión como en `tagLabels`).

## i18n

- No es vue-i18n. Implementación propia: refs globales `locale`/`translations` en `src/i18n/store.ts`, claves cargadas desde `src/i18n/messages/namespaces/common/{locale}.json` con `import.meta.glob` perezoso.
- `t()` devuelve `""` para claves inexistentes: una traducción faltante se ve como texto vacío, no como la clave. Verificar leyendo el JSON, no por ausencia de errores.
- `useTranslations()` se llama una sola vez en `App.vue`. El locale persiste en `localStorage["portfolio-locale"]` y por defecto usa `navigator.language`, con fallback a `"en"`.
- El contenido de proyectos también está indexado por locale (`projectModules[locale][slug]`), así que un proyecto debe existir en ambos locales.

## Audio (Howler)

- Dos capas independientes: música ambiental (`useMusic.ts`) y efectos de sonido / SFX (`useHowler.ts`, `useClickSounds.ts`, `sounds.ts`).
- `Howler.volume(1)` se mantiene activo de forma permanente tras el desbloqueo para que los efectos de interacción (clicks, pingüino, teclado, scroll, notificación) siempre sean audibles.
- El botón de la bocina (`SoundsToggle.vue`), la tecla `M` y la radio 3D controlan exclusivamente la música (`musicEnabled` / alias `soundsEnabled`), aplicando *fade-in* y *fade-out* suave a las pistas.
- La persistencia del estado de música se guarda en `localStorage["portfolio-musicEnabled"]` (con fallback a `"portfolio-soundsEnabled"`).

## Ciclo de vida 3D / render

- `src/sources.ts` es el registro de assets: todo GLB/texture debe importarse ahí y añadirse a `sources`. `utils/resources.ts` los carga y emite `ready`; `three/index.ts` inicializa cámara/renderer/objetos solo en ese evento. **Un asset fuera de `sources.ts` nunca se carga**.
- Shaders en `src/three/shaders/**` (`.glsl`/`.vert`/`.frag`), compilados por `vite-plugin-glsl`; `includes/` contiene los chunks que se importan desde los shaders. `*.ktx2` está en `resolve.extensions`, así que esos imports deben incluir la extensión.
- Hay dos instancias de Lenis (home + proyecto) y un ref `isTransitioning` (`useProjectTransition`, 500 ms) que controla scroll y visibilidad; el layout vive en el `.project-wrapper` de `App.vue` y alterna `position: fixed` ↔ `static`.
- `Home` permanece montado bajo el overlay del proyecto: no desmontarlo o se muere la escena 3D.

## Estilos

- Los mixins SCSS se inyectan automáticamente en cada bloque `<style lang="scss">` vía `additionalData` en `vite.config.ts` (`@use "/src/assets/styles/mixins.scss"`). **No importarlos a mano**: ya están, y un `@use` duplicado es error de redeclaración.
- El archivo inyecta el namespace `mixins`, así que los breakpoints son `@include mixins.mq("md")`, no `@include mq(...)`.
- Custom properties y escala de breakpoints viven en `variables.scss`/`colors.scss`; `index.scss` es la entrada global, importada una vez en `main.ts`.

## Convenciones (del AGENTS.md anterior — mantener)

- Código limpio: nombres descriptivos, funciones cortas y con una sola responsabilidad (SOLID).
- DRY; sin lógica duplicada.
- Manejo de errores, validación de entradas y tipado estricto.
- Al proponer un cambio, explicar brevemente por qué se eligió esa estructura y cómo mejora la calidad.
- **Nombres de archivo siempre en inglés** (el contenido/copy dentro de los archivos puede staying en el idioma del usuario).

## Gotchas

- `tsconfig.app.json` activa `noUnusedLocals`/`noUnusedParameters`/`erasableSyntaxOnly`: los `enum` y los imports sin usar fallan en `npm run typecheck`.
- `useAgent` maneja `isTouch`; el cursor personalizado y varias interacciones son solo de escritorio.
- Env: `.env` está en gitignore, en `.env.example` solo existe `VITE_SHOW_ATTRIBUTION` y actualmente nada lo lee.
