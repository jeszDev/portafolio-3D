<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Mail from "../../../components/icons/Mail.vue";
import Github from "../../../components/icons/Github.vue";
import Linkedin from "../../../components/icons/Linkedin.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";

const contactElement = ref<HTMLElement | null>(null);
const copied = ref(false);
let copyTimeout: number | null = null;

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("jjcr.dev@gmail.com");
    copied.value = true;
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = window.setTimeout(() => {
      copied.value = false;
    }, 2200);
  } catch {
    window.location.href = "mailto:jjcr.dev@gmail.com";
  }
};

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
  if (copyTimeout) clearTimeout(copyTimeout);
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <div class="status-badge">
        <span class="status-pulse"></span>
        <span class="status-text">{{ t("available-for-projects") }}</span>
      </div>

      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>

      <div class="contact-cards">
        <div
          class="contact-card email-card"
          :class="{ 'is-copied': copied }"
          role="button"
          tabindex="0"
          @click="copyEmail"
          @keydown.enter="copyEmail"
          data-sound="click"
          data-hoversound="hover"
          data-cursor="circle-white"
        >
          <div class="card-icon">
            <Mail />
          </div>
          <div class="card-info">
            <span class="card-label">{{ t("email-label") }}</span>
            <span class="card-value">jjcr.dev@gmail.com</span>
          </div>
          <div class="card-action">
            <span class="badge-copy">
              {{ copied ? t("copied") : t("copy") }}
            </span>
          </div>
        </div>

        <div class="social-grid">
          <a
            href="https://github.com/jeszDev"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card"
            data-sound="click"
            data-hoversound="hover"
            data-cursor="circle-white"
          >
            <div class="card-icon">
              <Github />
            </div>
            <div class="card-info">
              <span class="card-label">{{ t("github-label") }}</span>
              <span class="card-value">github.com/jeszDev</span>
            </div>
            <div class="card-action">
              <ArrowRight class="card-arrow" />
            </div>
          </a>
          
          <!-- <a href="https://linkedin.com/in/tu-perfil" target="_blank" class="contact-card social-card">
            <div class="card-icon"><Linkedin /></div>
            <div class="card-info">
              <span class="card-label">LinkedIn</span>
              <span class="card-value">Jessie Canchola</span>
            </div>
            <div class="card-action">
              <ArrowRight class="card-arrow" />
            </div>
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-xs); // Más compacto arriba en móvil
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: 0.6rem; // Espaciado más reducido en móvil

    @include mixins.mq("sm") {
      gap: var(--space-md);
      grid-column: 1 / 9;
      padding-top: var(--space-md);
    }

    @include mixins.mq("md") {
      gap: var(--space-lg);
      grid-column: 1 / 7;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }


  &-title {
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.18;
    font-size: clamp(20px, 5.5vw, 24px);
    max-width: 460px;

    @include mixins.mq("sm") {
      font-size: 28px;
    }

    @include mixins.mq("lg") {
      font-size: clamp(30px, 2.5vw, 36px);
    }

    :deep(.contact-highlight) {
      background: linear-gradient(135deg, var(--color-orange-400) 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      // display: inline-block;
      margin-top: 0.2rem;
    }
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  backdrop-filter: blur(8px);

  .status-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
    animation: pulse 2s infinite ease-in-out;
  }

  .status-text {
    font-family: "Fira Code", monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #10b981;
  }
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: var(--space-xs);
  max-width: 440px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.48rem 0.8rem;
  border-radius: 14px;
  background: rgba(18, 22, 31, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  @include mixins.mq("md") {
    gap: 1rem;
    padding: 0.85rem 1.15rem;
  }

  &:hover {
    background: rgba(24, 30, 42, 0.95);
    border-color: rgba(249, 115, 22, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.15);

    .card-icon {
      color: var(--color-orange-400);
      background: rgba(249, 115, 22, 0.12);
      border-color: rgba(249, 115, 22, 0.3);
    }

    .card-arrow {
      transform: translateX(4px);
      color: var(--color-orange-400);
    }
  }

  &.is-copied {
    border-color: rgba(16, 185, 129, 0.6);
    background: rgba(16, 185, 129, 0.08);

    .badge-copy {
      background: #10b981;
      color: #05070a;
      border-color: #10b981;
    }
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #cbd5e1;
    transition: all 0.25s ease;
    flex-shrink: 0;

    :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }

  .card-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex-grow: 1;
    min-width: 0;

    .card-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-300);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-value {
      font-family: "Fira Code", monospace;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--color-text-400);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-action {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .badge-copy {
      font-family: "Fira Code", monospace;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--color-text-400);
      transition: all 0.2s ease;
    }

    .card-arrow {
      width: 18px;
      height: 18px;
      color: var(--color-text-300);
      transition: transform 0.25s ease, color 0.25s ease;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.social-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  // En móvil (pantallas chicas), si hay 2 o más redes, se colocan en 2 columnas
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .contact-card {
      padding: 0.55rem 0.65rem;
      gap: 0.5rem;

      .card-icon {
        width: 34px;
        height: 34px;
      }

      .card-info .card-value {
        font-size: 0.78rem;
      }

      // En móvil ocultamos la flecha pequeña para darle más espacio al texto
      .card-action {
        display: none;
      }
    }
  }

  // En escritorio, siempre se apilan en una columna limpia a la izquierda
  @include mixins.mq("md") {
    display: flex;
    flex-direction: column;
  }
}
</style>
