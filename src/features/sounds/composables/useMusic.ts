import { onUnmounted, ref, watch } from "vue";
import { musicPlaylist, type MusicTrackItem } from "../definitions/music";
import { howlerUnlocked, soundsEnabled } from "./useHowler";
import { isFeatureEnabled } from "../../../utils/features";

export const useMusic = () => {
  const currentTrack = ref<MusicTrackItem | null>(null);
  let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

  const getRandomTrack = (previousId?: string): MusicTrackItem | null => {
    if (!musicPlaylist.length) return null;
    if (musicPlaylist.length === 1) return musicPlaylist[0];

    // Filter out previous track to avoid consecutive repetition
    const candidates = musicPlaylist.filter((track) => track.id !== previousId);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  };

  const playRandomTrack = () => {
    if (!isFeatureEnabled("sounds") || !musicPlaylist.length) return;

    if (currentTrack.value) {
      currentTrack.value.howl.off("end");
      currentTrack.value.howl.stop();
    }

    const nextTrack = getRandomTrack(currentTrack.value?.id);
    if (!nextTrack) return;

    currentTrack.value = nextTrack;
    nextTrack.howl.volume(nextTrack.volume);
    nextTrack.howl.load();

    // Play next random track automatically when current one ends
    nextTrack.howl.once("end", () => {
      if (soundsEnabled.value) {
        playRandomTrack();
      }
    });

    nextTrack.howl.play();
  };

  const pauseMusic = () => {
    if (pauseTimeout) clearTimeout(pauseTimeout);
    // Allow Howler's master volume to smoothly fade out before pausing the track
    pauseTimeout = setTimeout(() => {
      if (!soundsEnabled.value && currentTrack.value?.howl.playing()) {
        currentTrack.value.howl.pause();
      }
    }, 350);
  };

  const resumeOrStartMusic = () => {
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    if (!currentTrack.value) {
      playRandomTrack();
    } else if (!currentTrack.value.howl.playing()) {
      currentTrack.value.howl.play();
    }
  };

  const stopMusic = () => {
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    if (currentTrack.value) {
      currentTrack.value.howl.off("end");
      currentTrack.value.howl.stop();
      currentTrack.value = null;
    }
  };

  watch(
    [soundsEnabled, howlerUnlocked],
    ([enabled, unlocked]) => {
      if (!isFeatureEnabled("sounds")) return;

      if (enabled && unlocked) {
        resumeOrStartMusic();
      } else {
        pauseMusic();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    stopMusic();
  });
};
