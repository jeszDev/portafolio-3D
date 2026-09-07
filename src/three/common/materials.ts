import { MeshBasicMaterial, ShaderMaterial } from "three";
import { resources } from "../../utils/resources";
import shadowVertexShader from "../shaders/shadow-catcher/vertex.glsl";
import shadowFragmentShader from "../shaders/shadow-catcher/fragment.glsl";

import type { Material } from "three";

let gokuMaterial: Material | null = null;
let roomMaterial: Material | null = null;
let contactMaterial: Material | null = null;
let shadowMaterial: ShaderMaterial | null = null;

export const getGokuMaterial = (): Material => {
  if (gokuMaterial) return gokuMaterial;
  const texture = resources.items["goku-texture"];
  texture.flipY = false;

  gokuMaterial = new MeshBasicMaterial({ map: texture });

  return gokuMaterial;
};

export const getRoomMaterial = (): Material => {
  if (roomMaterial) return roomMaterial;
  const texture = resources.items["room-texture"];
  texture.flipY = false;

  roomMaterial = new MeshBasicMaterial({ map: texture });

  return roomMaterial;
};

export const getContactMaterial = (): Material => {
  if (contactMaterial) return contactMaterial;
  const texture = resources.items["contact-texture"];
  texture.flipY = false;

  contactMaterial = new MeshBasicMaterial({ map: texture });

  return contactMaterial;
};

export const getShadowMaterial = (): ShaderMaterial => {
  if (shadowMaterial) return shadowMaterial;

  shadowMaterial = new ShaderMaterial({
    vertexShader: shadowVertexShader,
    fragmentShader: shadowFragmentShader,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uTexture: { value: null },
      uColorBackground: { value: null },
      uColorShadow: { value: null },
    },
  });

  return shadowMaterial;
};
