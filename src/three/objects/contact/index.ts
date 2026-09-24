import {
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  BoxGeometry,
  RingGeometry,
  CircleGeometry,
  CanvasTexture,
  DoubleSide,
  Color,
} from "three";
import gsap from "gsap";
import { sceneWeights } from "../../../animations/scenes";
import { scene } from "../../core/scene";

/**
 * Escenario 3D de Contacto: Cancha cibernética, balón de fútbol y Marcador Jumbotron LED.
 */

const group = new Group();
group.position.set(0, -13, 0);

let soccerBallMesh: Mesh | null = null;
let ballShadowMesh: Mesh | null = null;
let avatarShadowMesh: Mesh | null = null;
let scoreboardMesh: Mesh | null = null;

const ballRotationSpeed = 0.005;

/**
 * Genera la textura clásica del balón de fútbol
 */
const createSoccerBallTexture = (): CanvasTexture => {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new CanvasTexture(canvas);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, width, height);

  const drawPentagon = (x: number, y: number, radius: number, rot = 0) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = radius * Math.cos(angle);
      const py = radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  const pentagonRadius = 46;
  const row1Y = height * 0.5;

  for (let i = 0; i < 5; i++) {
    const x = width * (0.1 + i * 0.2);
    drawPentagon(x, row1Y, pentagonRadius, (i % 2) * Math.PI);
  }

  const rowTopY = height * 0.22;
  for (let i = 0; i <= 5; i++) {
    const x = width * (i * 0.2);
    drawPentagon(x, rowTopY, pentagonRadius * 0.9, Math.PI / 5);
  }

  const rowBottomY = height * 0.78;
  for (let i = 0; i <= 5; i++) {
    const x = width * (i * 0.2);
    drawPentagon(x, rowBottomY, pentagonRadius * 0.9, -Math.PI / 5);
  }

  // Easter egg
  ctx.fillStyle = "#f97316";
  ctx.font = "bold 20px 'Fira Code', monospace";
  ctx.textAlign = "center";
  ctx.fillText("jesz>_ev", width * 0.3, row1Y - 65);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

/**
 * Genera la pantalla LED del marcador de estadio
 */
const createScoreboardTexture = (): CanvasTexture => {
  const width = 800;
  const height = 480;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new CanvasTexture(canvas);

  // Fondo pantalla negro mate
  ctx.fillStyle = "#07090e";
  ctx.fillRect(0, 0, width, height);

  // Borde neón sutil de la pantalla
  ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  // Encabezado
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(0, 0, width, 70);

  // Punto verde parpadeante de "EN VIVO"
  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(45, 35, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 20px 'Fira Code', monospace";
  ctx.textAlign = "left";
  ctx.fillText("EN VIVO · ESTADIO MORELOS", 68, 42);

  ctx.fillStyle = "#f97316";
  ctx.textAlign = "right";
  ctx.fillText("DÍA DE PARTIDO", width - 30, 42);

  // Equipos: JESZ DEV vs BUGS
  ctx.textAlign = "center";

  // Equipo local
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 28px 'Fira Code', monospace";
  ctx.fillText("JESZDEV", width * 0.26, 140);

  // Marcador local (Goles: 10)
  ctx.fillStyle = "#f97316";
  ctx.font = "900 82px 'Fira Code', monospace";
  ctx.fillText("10", width * 0.26, 235);

  // Separador de marcador central ":"
  ctx.fillStyle = "#64748b";
  ctx.font = "900 64px 'Fira Code', monospace";
  ctx.fillText(":", width * 0.5, 230);

  // Equipo visitante
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 28px 'Fira Code', monospace";
  ctx.fillText("BUGS", width * 0.74, 140);

  // Marcador visitante (Goles: 00)
  ctx.fillStyle = "#334155";
  ctx.font = "900 82px 'Fira Code', monospace";
  ctx.fillText("00", width * 0.74, 235);

  // Línea divisoria
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 290);
  ctx.lineTo(width - 30, 290);
  ctx.stroke();

  // Estado del partido y disponibilidad
  ctx.fillStyle = "#10b981";
  ctx.font = "bold 24px 'Fira Code', monospace";
  ctx.fillText("TIEMPO: 90'+3 · VICTORIA ASEGURADA", width * 0.5, 345);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "600 20px 'Fira Code', monospace";
  ctx.fillText("STATUS: DISPONIBLE PARA FICHAR ⚽", width * 0.5, 395);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

/**
 * Textura difuminada para sombras de contacto
 */
const createShadowTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const init = () => {
  createPitch();
  createSoccerBall();
  createScoreboard();

  scene.instance.add(group);
  gsap.ticker.add(tick);
};

const createPitch = () => {
  const turfGeo = new CircleGeometry(3.2, 48);
  const turfMat = new MeshBasicMaterial({
    color: new Color("#06080d"),
    side: DoubleSide,
    depthWrite: false,
  });
  const turf = new Mesh(turfGeo, turfMat);
  turf.rotation.x = -Math.PI / 2;
  turf.position.y = 0.005;
  group.add(turf);

  const lineGeo = new RingGeometry(1.5, 1.54, 64);
  const lineMat = new MeshBasicMaterial({
    color: new Color("#10b981"),
    side: DoubleSide,
    transparent: true,
    opacity: 0.75,
  });
  const centerCircle = new Mesh(lineGeo, lineMat);
  centerCircle.rotation.x = -Math.PI / 2;
  centerCircle.position.set(0, 0.015, 0);
  group.add(centerCircle);

  const spotGeo = new CircleGeometry(0.06, 24);
  const spotMat = new MeshBasicMaterial({
    color: new Color("#10b981"),
    side: DoubleSide,
  });
  const penaltySpot = new Mesh(spotGeo, spotMat);
  penaltySpot.rotation.x = -Math.PI / 2;
  penaltySpot.position.set(0, 0.018, 0);
  group.add(penaltySpot);

  const avatarShadowGeo = new CircleGeometry(0.55, 32);
  const avatarShadowMat = new MeshBasicMaterial({
    map: createShadowTexture(),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  avatarShadowMesh = new Mesh(avatarShadowGeo, avatarShadowMat);
  avatarShadowMesh.rotation.x = -Math.PI / 2;
  avatarShadowMesh.position.set(0, 0.012, 0);
  group.add(avatarShadowMesh);
};

const createSoccerBall = () => {
  const ballRadius = 0.30;
  const ballGeo = new SphereGeometry(ballRadius, 32, 32);
  const ballMat = new MeshBasicMaterial({
    map: createSoccerBallTexture(),
  });

  soccerBallMesh = new Mesh(ballGeo, ballMat);
  // Ubicado a la derecha de los pies del avatar sin tocarlo (x: 0.95)
  soccerBallMesh.position.set(1.05, ballRadius + 0.005, 0.2);
  soccerBallMesh.rotation.set(0.3, 0.5, -0.2);
  group.add(soccerBallMesh);

  const shadowGeo = new CircleGeometry(0.34, 32);
  const shadowMat = new MeshBasicMaterial({
    map: createShadowTexture(),
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  ballShadowMesh = new Mesh(shadowGeo, shadowMat);
  ballShadowMesh.rotation.x = -Math.PI / 2;
  ballShadowMesh.position.set(0.95, 0.012, 0.2);
  group.add(ballShadowMesh);
};

/**
 * Crea la pantalla de marcador flotante en la derecha
 */
const createScoreboard = () => {
  const screenWidth = 2.9;
  const screenHeight = 1.74;

  // Marco oscuro biselado
  const frameGeo = new BoxGeometry(screenWidth + 0.08, screenHeight + 0.08, 0.08);
  const frameMat = new MeshStandardMaterial({
    color: new Color("#111622"),
    roughness: 0.4,
    metalness: 0.6,
  });
  const frame = new Mesh(frameGeo, frameMat);

  // Pantalla LED frontal
  const screenGeo = new BoxGeometry(screenWidth, screenHeight, 0.02);
  const screenMat = new MeshBasicMaterial({
    map: createScoreboardTexture(),
  });
  const screen = new Mesh(screenGeo, screenMat);
  screen.position.z = 0.045;
  frame.add(screen);

  // Soporte o poste minimalista de fijación al suelo
  const poleGeo = new BoxGeometry(0.08, 2.3, 0.08);
  const poleMat = new MeshStandardMaterial({
    color: new Color("#0d1117"),
    roughness: 0.5,
  });
  const pole = new Mesh(poleGeo, poleMat);
  pole.position.set(0, -1.45, -0.02);
  frame.add(pole);

  scoreboardMesh = frame;
  // Ubicado a la derecha y con ligera rotación hacia la cámara
  scoreboardMesh.position.set(2.7, 2.2, -0.8);
  scoreboardMesh.rotation.set(0.04, -0.38, 0);

  group.add(scoreboardMesh);
};

let clockTime = 0;

const tick = () => {
  const isVisible = sceneWeights.contact > 0.001;
  group.visible = isVisible;

  if (!isVisible) return;

  // Rotación del balón
  if (soccerBallMesh) {
    soccerBallMesh.rotation.y += ballRotationSpeed;
  }

  // Flotación suave y sutil del marcador
  if (scoreboardMesh) {
    clockTime += 0.02;
    scoreboardMesh.position.y = 3.0 + Math.sin(clockTime) * 0.03;

    // En pantallas pequeñas (móvil), ocultar el marcador para mantener la vista limpia
    const isMobile = window.innerWidth < 768;
    scoreboardMesh.visible = !isMobile;
  }
};

const destroy = () => {
  gsap.ticker.remove(tick);

  if (soccerBallMesh) soccerBallMesh.geometry.dispose();
  if (scoreboardMesh) scoreboardMesh.geometry.dispose();

  scene.instance.remove(group);
};

export const contact = { init, tick, destroy, group };
