<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import TerminalWindow from "../../../components/TerminalWindow.vue";

const point = new Vector3(-0.9, 2, 6.75);

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
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On mobile, ensure clipPath is set to visible immediately
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay + 0.15);
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
    <div ref="wrapperRef" class="box-description">
      <TerminalWindow title="jesz@dev: ~/about" badge="PROFILE" glow="emerald" >
        <div class="terminal-cli">
          <div class="terminal-cmd">
            <span class="prompt-user">jesz</span><span class="prompt-arrow">&gt;</span><span class="prompt-cursor">_</span>
            <span class="cmd-text">cat profile.json</span>
          </div>

          <div class="json-viewer">
            <div class="json-line">
              <span class="json-brace">{</span>
            </div>
            <div class="json-line indent">
              <span class="json-key">"name"</span><span class="json-colon">:</span>
              <span class="json-val-str">"Jessie Canchola"</span><span class="json-comma">,</span>
            </div>
            <div class="json-line indent">
              <span class="json-key">"nickname"</span><span class="json-colon">:</span>
              <span class="json-val-str">"jeszDev"</span><span class="json-comma">,</span>
            </div>
            <div class="json-line indent">
              <span class="json-key">"role"</span><span class="json-colon">:</span>
              <span class="json-val-str">"Fullstack"</span><span class="json-comma">,</span>
            </div>
            <div class="json-line indent json-bio">
              <span class="json-key">"bio"</span><span class="json-colon">:</span>
              <span class="json-val-str">"</span>
              <AppearingText
                class="json-appearing-text"
                :text="t('about-tagline')"
                :steps="3"
                :duration="0.7"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
              />
              <span class="json-val-str">"</span>
            </div>
            <div class="json-line"><span class="json-brace">}</span></div>
          </div>


          <div class="terminal-prompt-end">
            <span class="prompt-user">jesz</span><span class="prompt-arrow">&gt;</span><span class="prompt-cursor prompt-blink">_</span>
          </div>
        </div>
      </TerminalWindow>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-description {
  --line-length: min(48px, calc(var(--svw) * 5));

  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    position: relative;
    left: 0;
    bottom: 0;
    width: 480px;
    max-width: calc(var(--svw) * 38);
    transform: translate(-100%, -50%);
    padding-top: 3px;
    padding-right: var(--line-length);
  }

  @include mixins.landscape-large {
    width: 440px;
    max-width: calc(var(--svw) * 34);
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  // Nodo conector verde esmeralda
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

  // Línea conectora punteada
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: var(--line-length);
    height: 0;
    border-top: 1px dashed rgba(16, 185, 129, 0.6);
  }
}

// Tipografía y estructura de la terminal interna
.terminal-cli {
  font-family: "Fira Code", monospace;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terminal-cmd {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;

  .cmd-text {
    color: #e5e7eb;
    font-weight: 500;
  }
}

.prompt-user {
  color: #10b981;
  font-weight: 700;
}

.prompt-arrow {
  color: #f97316;
  font-weight: 700;
}

.prompt-cursor {
  color: #f97316;
  font-weight: 700;

  &.prompt-blink {
    animation: blink-cursor 1s steps(1, end) infinite;
  }
}

// Visor JSON con sintaxis coloreada
.json-viewer {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 11px;
  line-height: 1.55;

  .json-line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    &.indent {
      padding-left: 14px;
    }
  }

  .json-brace {
    color: #f3f4f6;
  }

  .json-key {
    color: #38bdf8; // Azul cian para las claves JSON
  }

  .json-colon {
    color: #9ca3af;
    margin-right: 5px;
  }

  .json-val-str {
    color: #34d399; // Verde esmeralda para los strings
  }

  .json-comma {
    color: #6b7280;
  }

  .json-bio {
    word-break: break-word;
    align-items: flex-start;

    .json-appearing-text {
      color: #34d399;
      display: inline;
    }
  }
}

.terminal-prompt-end {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  margin-top: 2px;
}

@keyframes blink-cursor {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
