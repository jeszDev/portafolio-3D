<script setup lang="ts">
import Social from "./Social.vue";
import LangSwitch from "./LangSwitch.vue";
import NotchSection from "./NotchSection.vue";
import ButtonRound from "./ButtonRound.vue";
import ArrowRightLong from "./icons/ArrowRightLong.vue";
import { lenis } from "../composables/useScroll";

interface Props {
  withSocial?: boolean;
}

const { withSocial = true } = defineProps<Props>();

const handleBackToTop = () => {
  if (!lenis.value) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  lenis.value.scrollTo(0);
};
</script>

<template>
  <footer class="footer">
    <NotchSection class="footer-notch" />

    <div class="footer-container">
      <!-- Fila 1: Marca/Social y Botón Volver Arriba -->
      <div class="footer-row footer-row-top">
        <div class="footer-top-spacer" aria-hidden="true"></div>

        <div class="footer-brand-group">
          <div class="footer-logo">
            jesz<span class="footer-logo-accent">&gt;_</span>ev
          </div>
          <div v-if="withSocial" class="footer-social-wrapper">
            <Social variant="theme" />
          </div>
        </div>

        <div
          class="footer-back-to-top"
          tabindex="0"
          role="button"
          aria-label="Back to top"
          @click="handleBackToTop"
          @keydown.enter="handleBackToTop"
          data-cursor="circle-white"
          data-sound="click"
          data-hoversound="hover"
        >
          <span class="footer-back-to-top-label">Subir</span>
          <ButtonRound
            renderAs="div"
            variant="border"
            size="md"
            class="footer-back-to-top-btn children-unclickable"
            data-hoversound="hover"
          >
            <ArrowRightLong class="footer-back-to-top-icon" />
          </ButtonRound>
        </div>
      </div>

      <!-- Línea Divisoria Sutil -->
      <div class="footer-divider" aria-hidden="true"></div>

      <!-- Fila 2: Créditos, Copyright y Enlaces Legales -->
      <div class="footer-row footer-row-bottom">
        <div class="footer-credits">
          <span class="footer-copy">© {{ new Date().getFullYear() }} Jessie Canchola</span>
        </div>

        <div class="footer-actions">
          <LangSwitch />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  background: var(--color-background-300, #12161f);
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &-notch {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-background-300, var(--color-beige-400));
    --icon-color: var(--color-background-300, var(--color-beige-400));
  }

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: var(--breakpoint-xxxl);
    padding: var(--space-lg) var(--space-outer) var(--space-md);
    gap: var(--space-md);

    @include mixins.mq("md") {
      padding: var(--space-xl) var(--space-outer) var(--space-lg);
      gap: var(--space-lg);
    }
  }

  /* Filas Estructuradas */
  &-row {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    &-top {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      gap: var(--space-md);
      width: 100%;

      @include mixins.mq("sm") {
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
      }
    }

    &-bottom {
      flex-direction: column;
      gap: var(--space-sm);
      font-size: var(--font-size-xs);
      color: var(--color-text-300);

      @include mixins.mq("lg") {
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }

  &-top-spacer {
    display: none;

    @include mixins.mq("sm") {
      display: block;
    }
  }

  /* Marca & Redes */
  &-brand-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    justify-self: center;
  }

  &-logo {
    font-family: "Urbanist", sans-serif;
    font-size: var(--font-size-lg);
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--color-text-400);

    &-accent {
      color: var(--color-accent-400, var(--color-orange-400));
    }
  }

  &-social-wrapper {
    display: flex;
    align-items: center;
  }

  /* Botón Volver Arriba */
  &-back-to-top {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    cursor: pointer;
    user-select: none;
    transition: all 0.25s ease;
    justify-self: center;

    @include mixins.mq("sm") {
      justify-self: end;
    }

    @include mixins.hover {
      &:hover {
        color: var(--color-accent-400, var(--color-orange-400));

        .footer-back-to-top-icon {
          // transform: rotate(-90deg) translateY(-2px);
        }

        .footer-back-to-top-btn {
          border-color: var(--color-accent-400, var(--color-orange-400));
          color: var(--color-accent-400, var(--color-orange-400));
          --icon-color: var(--color-accent-400, var(--color-orange-400));
        }
      }
    }

    &-label {
      font-size: var(--font-size-xs);
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text-300);
      transition: color 0.2s ease;
    }

    &-icon {
      transform: rotate(-90deg);
      transition: transform 0.25s ease;
    }
  }

  /* Divisor */
  &-divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  /* Créditos y Copyright */
  &-credits {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    text-align: center;

    @include mixins.mq("lg") {
      justify-content: flex-start;
      gap: var(--space-xs);
    }

    &-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xxs);
    }
  }

  &-copy {
    font-weight: 700;
    color: var(--color-text-400);
  }

  &-sep {
    color: rgba(255, 255, 255, 0.2);
    user-select: none;
  }

  &-link {
    font-weight: 600;
    color: var(--color-text-300);
    transition: color 0.2s ease;

    @include mixins.hover {
      &:hover {
        color: var(--color-accent-400, var(--color-orange-400));
      }
    }
  }

  /* Acciones & Idioma */
  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
  }

  &-legal {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
}
</style>
