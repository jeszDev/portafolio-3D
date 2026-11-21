import { onUnmounted, ref, watch } from "vue";
import { musicPlaylist, type MusicTrackItem } from "../definitions/music";
import { howlerUnlocked, musicEnabled } from "./useHowler";
import { isFeatureEnabled } from "../../../utils/features";

export const useMusic = () => {
  const currentTrack = ref<MusicTrackItem | null>(null);
  let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

  const getRandomTrack = (previousId?: string): MusicTrackItem | null => {
    if (!musicPlaylist.length) return null;
    if (musicPlaylist.length === 1) return musicPlaylist[0] ?? null;

    // Filter out previous track to avoid consecutive repetition
    const candidates = musicPlaylist.filter((track) => track.id !== previousId);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex] ?? null;
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
    nextTrack.howl.volume(0);
    nextTrack.howl.load();

    // Play next random track automatically when current one ends
    nextTrack.howl.once("end", () => {
      if (musicEnabled.value) {
        playRandomTrack();
      }
    });

    nextTrack.howl.play();
    nextTrack.howl.fade(0, nextTrack.volume, 600);
  };

  const pauseMusic = () => {
    if (pauseTimeout) clearTimeout(pauseTimeout);
    if (!currentTrack.value || !currentTrack.value.howl.playing()) return;

    const track = currentTrack.value;
    const currentVol = track.howl.volume();
    track.howl.fade(currentVol, 0, 400);

    // Pause the track after the fade out completes to save resources
    pauseTimeout = setTimeout(() => {
      if (!musicEnabled.value && track.howl.playing()) {
        track.howl.pause();
      }
    }, 400);
  };

  const resumeOrStartMusic = () => {
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    if (!currentTrack.value) {
      playRandomTrack();
    } else {
      const track = currentTrack.value;
      if (!track.howl.playing()) {
        track.howl.play();
      }
      track.howl.fade(track.howl.volume(), track.volume, 400);
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
    [musicEnabled, howlerUnlocked],
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
