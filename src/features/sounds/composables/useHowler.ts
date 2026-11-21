import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { Howler } from "howler";
import { isFeatureEnabled } from "../../../utils/features";
import { tick as contactTick } from "../core/contact";
import { stopSnoreRepetition } from "../core/contact";
import { tick as roomTick } from "../core/room";
import { sounds } from "../definitions/sounds";
import { getSoundsHowl } from "../utils/sounds";

import type { SoundKey } from "../types";

export const howlerUnlocked = ref(false);
export const musicEnabled = ref(false);
// Backward compatibility alias for any component referencing soundsEnabled
export const soundsEnabled = musicEnabled;

Howler.volume(1);

export const useHowler = () => {
  const handleUnlocked = () => {
    howlerUnlocked.value = true;
    Howler.volume(1);

    const storeItem =
      localStorage.getItem("portfolio-musicEnabled") ?? localStorage.getItem("portfolio-soundsEnabled");
    if (storeItem) {
      musicEnabled.value = storeItem === "true";
    } else {
      musicEnabled.value = true;
      localStorage.setItem("portfolio-musicEnabled", "true");
      localStorage.setItem("portfolio-soundsEnabled", "true");
    }
  };

  const tick = () => {
    if (!howlerUnlocked.value) {
      if (Howler.ctx.state !== "running") return;
      handleUnlocked();
    } else {
      contactTick();
      roomTick();
    }
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyM") {
      musicEnabled.value = !musicEnabled.value;
    }
  };

  watch(musicEnabled, (newVal) => {
    if (!isFeatureEnabled("sounds")) return;
    localStorage.setItem("portfolio-musicEnabled", newVal.toString());
    localStorage.setItem("portfolio-soundsEnabled", newVal.toString());
  });

  const loadAllSounds = () => {
    for (const sound of Object.keys(sounds) as SoundKey[]) {
      const howl = getSoundsHowl(sound);
      if (howl) {
        howl.load();
      }
    }
  };

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    Howler.volume(1);

    if (howlerUnlocked.value) {
      const storeItem =
        localStorage.getItem("portfolio-musicEnabled") ?? localStorage.getItem("portfolio-soundsEnabled");
      musicEnabled.value = storeItem === "true";
    }

    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);

    loadAllSounds();
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    window.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("keydown", handleKeyPress);
    stopSnoreRepetition();
  });
};
