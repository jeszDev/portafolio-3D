import {
  Box3,
  CanvasTexture,
  Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
} from "three";
import { raycast } from "../../utils/raycast";
import { playSound } from "../../../features/sounds/utils/sounds";

import type { ClickableBox3 } from "../../types";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

const DEFAULT_MESSAGES = [
  "Estoy trabajando en mi portafolio web.",
  "Estoy estudiando Nuxt & Vue 3.",
  "Explorando Three.js y 3D en la web.",
  "¡Bienvenido a mi espacio de trabajo!",
] as const;

/** Returns the message at `index`, falling back to the first one if out of range. */
const getMessage = (index: number): string => DEFAULT_MESSAGES[index] ?? DEFAULT_MESSAGES[0];

let mesh: Mesh | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let texture: CanvasTexture | null = null;
let material: MeshBasicMaterial | null = null;
let box3: ClickableBox3 | null = null;
let currentMessageIndex = 0;
let currentMessage = getMessage(0);

const initCanvas = () => {
  canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx = canvas.getContext("2d");

  texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  // flipY = false porque el UV proyectado desde la vista de Blender tiene el origen Y arriba
  texture.flipY = false;

  material = new MeshBasicMaterial({ map: texture });
};

const drawChalkboard = (message: string) => {
  if (!ctx || !canvas || !texture) return;
  // Local alias keeps the non-null narrowing inside callbacks.
  const context = ctx;

  // 1. Fondo verde pizarra escolar limpio
  context.fillStyle = "#1e3c2f";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 2. Sutil degradado para efecto de profundidad y luz tenue
  const gradient = context.createRadialGradient(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_HEIGHT * 0.35,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_WIDTH * 0.65
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.15)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 3. Estilo de texto tipo tiza
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 52px system-ui, -apple-system, sans-serif";

  // Efecto difuso de tiza (chalk glow)
  context.shadowColor = "rgba(255, 255, 255, 0.35)";
  context.shadowBlur = 4;

  // 4. Auto-wrap para oraciones largas
  const maxWidth = CANVAS_WIDTH - 120;
  const lineHeight = 70;
  const words = message.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth && index > 0) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine);

  // Centrar verticalmente las líneas
  const startY =
    CANVAS_HEIGHT / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, index) => {
    context.fillText(line, CANVAS_WIDTH / 2, startY + index * lineHeight);
  });

  // Reset shadow
  context.shadowColor = "transparent";
  context.shadowBlur = 0;

  // Notificar a Three.js que la textura cambió
  texture.needsUpdate = true;
};

const setMessage = (text: string) => {
  currentMessage = text;
  drawChalkboard(text);
};

const nextMessage = () => {
  currentMessageIndex = (currentMessageIndex + 1) % DEFAULT_MESSAGES.length;
  setMessage(getMessage(currentMessageIndex));
};

const handleClick = () => {
  playSound("click");
  nextMessage();
};

const updateBox3 = () => {
  if (!mesh || !box3) return;
  mesh.updateWorldMatrix(true, false);
  box3.setFromObject(mesh);
  // Expandir para darle volumen físico y que el raycast lo detecte fácilmente
  box3.expandByScalar(0.3);
};

const init = (_mesh: Mesh) => {
  mesh = _mesh;

  if (!canvas) {
    initCanvas();
  }

  if (material) {
    mesh.material = material;
  }

  drawChalkboard(currentMessage);

  // Crear collider clickeable
  box3 = new Box3();
  updateBox3();
  box3.onClick = handleClick;
  box3.hoverSound = "click";

  raycast.boxesToCheck.push(box3);
};

const tick = () => {
  updateBox3();
};

const destroy = () => {
  if (box3) {
    const index = raycast.boxesToCheck.indexOf(box3);
    if (index !== -1) {
      raycast.boxesToCheck.splice(index, 1);
    }
  }
  box3 = null;
  material?.dispose();
  texture?.dispose();
  material = null;
  texture = null;
  canvas = null;
  ctx = null;
  mesh = null;
};

export const blackboard = {
  init,
  tick,
  setMessage,
  nextMessage,
  destroy,
};
