import { resources } from "../../../utils/resources";
import { scene } from "../../core/scene";
import { Euler, Group, Mesh, MeshBasicMaterial } from "three";
import { getRoomMaterial, getGokuMaterial } from "../../common/materials";
import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
// import { shadow } from "./shadow";
import { desktops } from "./desktops";
import { mouse } from "./mouse";
import { messagePopup } from "./message-popup";
import { penguin } from "./penguin";
import { music } from "./music";
import { blackboard } from "./blackboard";

import type { Object3D } from "three";

const group = new Group();
const chairScrollRotation = new Euler();

let objects: {
  "blackboard-frame": Mesh;
  "blackboard-screen": Mesh;
  carpet: Mesh;
  chair: Mesh;
  frame: Mesh;
  goku: Mesh;
  mouse: Mesh;
  music: Mesh;
  penguin: Mesh;
  "penguin-wing-left": Mesh;
  "penguin-wing-right": Mesh;
  plant: Mesh;
  room: Mesh;
  shelf: Mesh;
} | null = null;

const init = () => {
  gsap.ticker.add(tick);
  initObjects();
  // shadow.init();
  desktops.init();
  messagePopup.init();
  if (objects?.mouse) mouse.init(objects.mouse);
  if (objects?.penguin)
    penguin.init(objects.penguin, { left: objects["penguin-wing-left"], right: objects["penguin-wing-right"] });
  
  if (objects?.music) music.init(objects.music);

  if (objects?.["blackboard-screen"])
    blackboard.init(objects["blackboard-screen"]);
};

const initObjects = () => {
  if (objects) return;
  const resource = resources.items["room-model"];

  const penguin = resource.scene.children.find((child: Object3D) => child.name === "penguin");
  
  objects = {
    "blackboard-frame": resource.scene.children.find((child: Object3D) => child.name === "blackboard-frame"),
    "blackboard-screen": resource.scene.children.find((child: Object3D) => child.name === "blackboard-screen"),
    carpet: resource.scene.children.find((child: Object3D) => child.name === "carpet"),
    chair: resource.scene.children.find((child: Object3D) => child.name === "chair"),
    frame: resource.scene.children.find((child: Object3D) => child.name === "frame"),
    mouse: resource.scene.children.find((child: Object3D) => child.name === "mouse"),
    music: resource.scene.children.find((child: Object3D) => child.name === "music"),
    plant: resource.scene.children.find((child: Object3D) => child.name === "plant"),
    room: resource.scene.children.find((child: Object3D) => child.name === "room"),
    shelf: resource.scene.children.find((child: Object3D) => child.name === "shelf"),
    goku: resource.scene.children.find((child: Object3D) => child.name === "goku"),
    penguin,
    "penguin-wing-left": penguin.children.find((child: Object3D) => child.name === "penguin-wing-left"),
    "penguin-wing-right": penguin.children.find((child: Object3D) => child.name === "penguin-wing-right"),
  };

  const roomMaterial = getRoomMaterial();
  const gokuMaterial = getGokuMaterial();
  const blackboardFrameMaterial = new MeshBasicMaterial({ color: 0x753514 });

  Object.values(objects).forEach((object) => {
    if (!object) return;

    if (object.name === "goku") {
      object.material = gokuMaterial;
    } else if (object.name === "blackboard-frame") {
      object.material = blackboardFrameMaterial;
    } else if (object.name === "blackboard-screen") {
      // blackboard.init le asigna su propio CanvasTexture dinámico
    } else {
      object.material = roomMaterial;
    }

    group.add(object);

    if (object.name === "carpet") {
      object.renderOrder = -10;
      object.onBeforeRender = () => {
        roomMaterial.depthWrite = false;
      };

      object.onAfterRender = () => {
        roomMaterial.depthWrite = true;
      };
    }
  });

  scene.instance.add(group);
};

const tick = () => {
  group.visible = sceneWeights.hero > 0.001;

  if (objects?.chair) {
    objects.chair.rotation.copy(chairScrollRotation);
  }

  penguin.tick();
  music.tick();
  blackboard.tick();
};

const destroy = () => {
  gsap.ticker.remove(tick);
  // shadow.destroy();
  //group.clear();
  //objects = null;
  desktops.destroy();
  mouse.destroy();
  penguin.destroy();
  music.destroy();
  blackboard.destroy();
};

export const room = { init, destroy, group, chairScrollRotation };
