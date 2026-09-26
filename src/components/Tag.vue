<script setup lang="ts">
import { computed } from "vue";
import { tagLabels, type TagVariant } from "./tagVariants";

const props = defineProps<{
  variant: TagVariant;
}>();

const classes = computed(() => ["tag", `tag-variant-${props.variant}`]);
</script>

<template>
  <div :class="classes">
    <p class="tag-copy">{{ tagLabels[props.variant] }}</p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: var(--radius-md);
  padding: calc(var(--space-xxs) - var(--stroke-md)) calc(var(--space-sm  ) - var(--stroke-md));
  border: var(--stroke-md) solid transparent;

  &-copy {
    font-size: var(--font-size-xs);
    font-weight: 700;
  }

  &-variant {
    &-laravel {
      background-color: #ff2d20;
      color: white;
    }

    &-vue {
      background-color: #4fc08d;
      color: #0f2e22;
    }

    &-php {
      background-color: #777bb4;
      color: white;
    }

    &-mysql,
    &-msyql {
      background-color: #00758f;
      color: white;
    }

    &-sqlserver {
      background-color: #cc292b;
      color: white;
    }

    &-bootstrap {
      background-color: #7952b3;
      color: white;
    }

    &-tailwind {
      background-color: #06b6d4;
      color: #052a30;
    }

    &-alpine {
      background-color: #77c1d2;
      color: #0a2f38;
    }

    &-livewire {
      background-color: #fb70a9;
      color: #3b091e;
    }

    &-jquery {
      background-color: #0769ad;
      color: white;
    }

    &-typescript {
      background-color: #3178c6;
      color: white;
    }

    &-javascript {
      background-color: #ffdf4f;
      color: #362d03;
    }

    &-three {
      background-color: #ed9c55;
      color: #492708;
    }

    &-react {
      background-color: #61dafb;
      color: #0f2e36;
    }

    &-websockets {
      background-color: #2674a4;
      color: white;
    }

    &-redis {
      background-color: #ce4036;
      color: white;
    }

    &-html {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-css {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-node {
      background-color: #237d23;
      color: white;
    }

    &-next {
      background-color: white;
      color: black;
    }

    &-kubernetes {
      background-color: #326ce5;
      color: white;
    }

    &-postgresql {
      background-color: #2f6c92;
      color: white;
    }

    &-ogl {
      background-color: #0e5495;
      color: white;
    }

    &-glsl {
      background-color: #95630e;
      color: white;
    }
  }
}
</style>
