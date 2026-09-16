<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import AppearingText from "./AppearingText.vue";
import gsap from "gsap";

const props = defineProps<{
  copy: string;
  size?: "sm" | "md";
  animated?: boolean;
}>();

const resolvedSize = computed(() => props.size ?? "md");

const appearingTl = ref<gsap.core.Timeline | null>(null);
const bannerRef = ref<HTMLDivElement | null>(null);
const backgroundRef = ref<HTMLDivElement | null>(null);

const DURATION = 0.6;

const handleTimelineCreated = (timeline: gsap.core.Timeline) => {
  appearingTl.value = timeline;
};

watchEffect((onInvalidate) => {
  if (!appearingTl.value || !bannerRef.value || !backgroundRef.value || !props.animated || !props.copy) return;

  // Create wrapper timeline with ScrollTrigger
  const tl = gsap.timeline({
    onStart: () => {
      appearingTl.value?.play();
    },

    scrollTrigger: {
      trigger: bannerRef.value,
      start: "top bottom",
      end: "bottom top",
    },
  });

  const progress = { value: 0 };
  tl.to(progress, { value: 1, duration: DURATION }, 0);

  // Animate background scale up while text is animating
  const textDuration = appearingTl.value.duration();
  gsap.set(backgroundRef.value, { scaleX: 0 });
  tl.fromTo(backgroundRef.value, { scaleX: 0 }, { scaleX: 1, duration: textDuration, ease: "power2.out" }, 0);

  onInvalidate(() => {
    tl.kill();
  });
});
</script>

<template>
  <div ref="bannerRef" class="banner" :class="`banner-size-${resolvedSize}`">
    <div ref="backgroundRef" class="banner-background"></div>
    <div class="banner-copy" :class="`banner-copy-size-${resolvedSize}`">
      <AppearingText
        :text="props.copy"
        :steps="2"
        :duration="DURATION"
        @timeline:created="handleTimelineCreated"
        v-if="props.animated"
      />
      <p class="banner-copy-value" v-else>{{ props.copy }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  width: fit-content;
  transform-origin: center center;
  position: relative;

  &-background {
    position: absolute;
    // Borde sutil y fondo naranja neón con resplandor
    outline: 2px solid rgba(249, 115, 22, 0.4);
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    box-shadow: 0 0 25px rgba(249, 115, 22, 0.5);
    border-radius: 4px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: left center;
  }

  &-size {
    &-sm {
      padding: 2px var(--space-xxs);

      @include mixins.mq("lg") {
        padding: var(--space-xxs) var(--space-xs);
      }
    }

    &-md {
      padding: var(--space-xxs) var(--space-xs);

      @include mixins.mq("lg") {
        padding: var(--space-xs) var(--space-sm);
      }
    }
  }

  &-copy {
    font-weight: 800;
    color: #0a0c10; // Texto negro Obsidian para máximo contraste
    font-family: "Fira Code", monospace;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &-size {
      &-sm {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-xs);
        }
      }

      &-md {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("lg") {
          font-size: var(--font-size-title-xs);
        }

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-sm);
        }
      }
    }
  }
}
</style>
