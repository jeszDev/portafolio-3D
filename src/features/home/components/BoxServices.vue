<script setup lang="ts">
import { computed, ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { locale } from "../../../i18n/store";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import TerminalWindow from "../../../components/TerminalWindow.vue";

const point = new Vector3(0.75, 2.75, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

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
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
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
        }, item.delay + 0.25);
      }

      // Only fade in on desktop
      if (!isMobile && subRefs.value.length > 0) {
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          tl.fromTo(subItems, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.1 }, 0.3);
        }
      } else if (isMobile && subRefs.value.length > 0) {
        // On mobile, ensure opacity is 1 immediately
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          gsap.set(subItems, { opacity: 1 });
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

interface SkillItem {
  name: string;
  tag: string;
}

const SKILLS_EN: SkillItem[] = [
  { name: "Three.js & WebGL", tag: "3D" },
  { name: "Vue 3 & React", tag: "FRONT" },
  { name: "Laravel & Node.js", tag: "BACK" },
  { name: "Kubernetes & Redis", tag: "CLOUD" },
  { name: "Real-time Multiplayer", tag: "SOCKET" },
];

const SKILLS_ES: SkillItem[] = [
  { name: "Three.js & WebGL", tag: "3D" },
  { name: "Vue 3 & React", tag: "FRONT" },
  { name: "Laravel & Node.js", tag: "BACK" },
  { name: "Kubernetes & Redis", tag: "CLOUD" },
  { name: "Tiempo real & WebSockets", tag: "SOCKET" },
];

const skills = computed<SkillItem[]>(() => {
  if (locale.value === "es") return SKILLS_ES;
  if (locale.value === "en") return SKILLS_EN;
  return SKILLS_ES;
});
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-services">
      <TerminalWindow title="jesz@dev: ~/skills" badge="STACK" glow="cyan">
        <div class="terminal-cli">
          <div class="terminal-cmd">
            <span class="prompt-user">jesz</span><span class="prompt-arrow">&gt;</span><span class="prompt-cursor">_</span>
            <span class="cmd-text">pnpm list --skills</span>
          </div>

          <div class="skills-tree">
            <div
              v-for="(skill, index) in skills"
              :key="skill.name"
              class="skill-row"
            >
              <!-- Rama del árbol: la última usa └──, las demás ├── -->
              <span class="tree-branch">{{ index === skills.length - 1 ? '└──' : '├──' }}</span>
              <span class="skill-check">[✓]</span>
              <span class="skill-name">
                <AppearingText
                  :text="skill.name"
                  :steps="1"
                  :duration="0.35"
                  @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15 + index * 0.1)"
                />
              </span>
              <span class="skill-tag">[{{ skill.tag }}]</span>
            </div>
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
.box-services {
  --line-length: min(48px, calc(var(--svw) * 5));

  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    width: 480px;
    max-width: calc(var(--svw) * 38);
    padding-left: var(--line-length);
    position: relative;
    left: 0;
    bottom: 0;
    padding-top: 3px;
    transform: translate(0, -50%);
  }

  @include mixins.landscape-large {
    width: 420px;
    max-width: calc(var(--svw) * 34);
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  // Nodo conector cian neón al avatar
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 9px;
    height: 9px;
    background-color: #38bdf8;
    box-shadow: 0 0 8px #38bdf8;
    border-radius: 50%;
  }

  // Línea conectora punteada
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 0;
    border-top: 1px dashed rgba(56, 189, 248, 0.6);

    @include mixins.landscape {
      width: var(--line-length);
    }
  }
}

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

// Árbol de dependencias
.skills-tree {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-row {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  line-height: 1.5;
  padding: 3px 6px;
  border-radius: 4px;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  // Micro-interacción: hover neón
  &:hover {
    background: rgba(56, 189, 248, 0.1);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.12);

    .skill-name {
      color: #ffffff;
    }

    .skill-tag {
      color: #38bdf8;
      border-color: rgba(56, 189, 248, 0.4);
    }
  }

  .tree-branch {
    color: rgba(255, 255, 255, 0.28);
    font-size: 10px;
  }

  .skill-check {
    color: #10b981;
    font-weight: 700;
    font-size: 10.5px;
  }

  .skill-name {
    color: #e2e8f0;
    flex: 1;
  }

  .skill-tag {
    font-size: 9.5px;
    font-weight: 600;
    color: rgba(56, 189, 248, 0.7);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 3px;
    padding: 0 4px;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
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
