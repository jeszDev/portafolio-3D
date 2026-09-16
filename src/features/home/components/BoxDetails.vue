<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import PinIcon from "../../../components/icons/Pin.vue";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(-0.76, 3.6, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  // Clean up previous matchMedia
  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  // Initialize GSAP matchMedia
  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      isLandscape: `(min-aspect-ratio: 1)`,
    },
    (context) => {
      const { conditions } = context;
      const { isLandscape } = conditions as { isMobile: boolean; isDesktop: boolean; isLandscape: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on landscape (animations disabled on portrait)
      if (isLandscape) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On portrait, set clipPath immediately without animation
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      // Only add timeline animations on landscape
      if (isLandscape) {
        for (let i = 0; i < timelines.value.length; i++) {
          const item = timelines.value[i];
          if (!item) continue;
          tl.add(() => {
            item.timeline.restart(true);
          }, item.delay + 0.25);
        }
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-details">
      <div class="box-details-content">
        <div class="telemetry-badge">
          <span class="status-pulse"></span>
          <span class="status-label">SYS_ONLINE</span>
        </div>
        
        <div class="telemetry-step">|</div>

        <div class="telemetry-host">
          <span class="prompt-sym">&gt;_</span>
          <AppearingText
            text="jesz@dev"
            :steps="1"
            :duration="0.3"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)" />
        </div>

        <div class="telemetry-step">|</div>

        <div class="telemetry-location">
          <PinIcon class="telemetry-icon" />
          <AppearingText
            v-if="t('germany')"
            class="telemetry-location-text"
            :text="t('germany')"
            :steps="2"
            :duration="0.3"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)" />
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-details {
  --line-length: min(48px, calc(var(--svw) * 5));

  display: none;

  @include mixins.landscape {
    display: block;
    position: absolute;
    padding-bottom: 3px;
    padding-right: var(--line-length);
    width: auto;
    white-space: nowrap;
    transform: translate(-100%, -50%);
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 9px;
    height: 9px;
    background-color: #10b981;
    box-shadow: 0 0 8px #10b981;
    border-radius: 50%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: var(--line-length);
    height: 0;
    border-bottom: 1px dashed rgba(16, 185, 129, 0.6);
  }

  &-content {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(13, 17, 23, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(16, 185, 129, 0.35);
    border-radius: 20px;
    padding: 6px 14px;
    font-family: "Fira Code", monospace;
    font-size: 11px;
    color: #e5e7eb;
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.45),
      0 0 12px rgba(16, 185, 129, 0.15);
  }

  .telemetry-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 10px;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 700;
    color: #10b981;
    letter-spacing: 0.5px;
    .status-pulse {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10b981;
      animation: pulse-dot 1.8s infinite ease-in-out;
    }
  }
  
  .telemetry-step {
    color: rgba(255, 255, 255, 0.2);
    font-size: 11px;
  }
  
  .telemetry-host {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #93c5fd;
    font-weight: 500;
    .prompt-sym {
      color: #10b981;
      font-weight: 700;
    }
  }
  
  .telemetry-location {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #f97316;
    padding-right: 8px;
    .telemetry-icon {
      width: 12px;
      height: 12px;
      --icon-color: #f97316;
    }
    &-text {
      color: #cbd5e1;
    }
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.8);
  }
}
</style>
