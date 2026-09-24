<script setup lang="ts">
import Social from "./Social.vue";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import LangSwitch from "./LangSwitch.vue";
import NotchSection from "./NotchSection.vue";
import ButtonRound from "./ButtonRound.vue";
import ArrowRightLong from "./icons/ArrowRightLong.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
import { lenis } from "../composables/useScroll";

interface Props {
  withSocial?: boolean;
}

const { withSocial = true } = defineProps<Props>();
const showAttribution = import.meta.env.VITE_SHOW_ATTRIBUTION !== "false";

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

          <!-- <template v-if="showAttribution">
            <span class="footer-sep">•</span>
            <div class="footer-credits-item">
              <span>{{ t("original-concept-by") }}</span>
              <Clickable renderAs="span">
                <Link
                  href="https://jeszdev.dev"
                  class="footer-link children-unclickable"
                  external
                  data-cursor="circle-white"
                  data-hoversound="hover"
                >
                  Jessie Canchola
                </Link>
              </Clickable>
            </div>
          </template> -->

          <!-- <span class="footer-sep">•</span> -->

          <!-- <div class="footer-credits-item">
            <span>{{ t("music-produced-by") }}</span>
            <Clickable renderAs="span">
              <Link
                href="https://soundcloud.com/hmsurf"
                class="footer-link children-unclickable"
                external
                data-cursor="circle-white"
                data-hoversound="hover"
              >
                HM Surf
              </Link>
            </Clickable>
          </div> -->
        </div>

        <div class="footer-actions">
          <!-- <div class="footer-legal">
            <Clickable renderAs="div">
              <Link
                :href="locale === 'de' ? '/de/privacy' : '/privacy'"
                class="footer-link"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
              >
                {{ t("privacy") }}
              </Link>
            </Clickable>

            <span class="footer-sep">•</span>

            <Clickable renderAs="div">
              <Link
                :href="locale === 'de' ? '/de/legal' : '/legal'"
                class="footer-link children-unclickable"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
              >
                {{ t("legal") }}
              </Link>
            </Clickable>
          </div> -->

          <!-- <span class="footer-sep footer-sep-lang">•</span> -->

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
      flex-direction: column;
      gap: var(--space-md);

      @include mixins.mq("sm") {
        flex-direction: row;
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

  /* Marca & Redes */
  &-brand-group {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
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

    @include mixins.hover {
      &:hover {
        color: var(--color-accent-400, var(--color-orange-400));

        .footer-back-to-top-icon {
          transform: rotate(-90deg) translateY(-2px);
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
