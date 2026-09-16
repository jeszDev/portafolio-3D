<template>
    <div :class="['terminal-window', `terminal-glow-${glow}`]">
        <div class="terminal-header">
            <div class="terminal-controls" aria-hidden="true">
                <span class="control-dot close"></span>
                <span class="control-dot minimize"></span>
                <span class="control-dot maximize"></span>
            </div>
            
            <div class="terminal-title">
                <span class="terminal-title-icon">&gt;_</span>
                <span class="terminal-title-text">{{ title }}</span>
            </div>

            <div v-if="badge" class="terminal-badge">
                <span class="badge-dot"></span>
                {{ badge }}
            </div>
        </div>

        <div class="terminal-body">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string;
    badge?: string;
    glow?: "emerald" | "cyan" | "orange";
}

withDefaults(defineProps<Props>(), {
    title: "jesz@dev: ~",
    badge: "BASH",
    glow: "emerald",
});
</script>

<style scoped lang="scss">
.terminal-window {
    width: 100%;
    background: rgba(13, 17, 23, 0.88);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(16, 185, 129, 0.28);
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
        0 12px 36px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(16, 185, 129, 0.28);
    font-family: "Fira Code", "Space Grotesk", "ProFontWindows", monospace;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &.terminal-glow-cyan {
        border-color: rgba(56, 189, 248, 0.3);
        box-shadow: 
            0 12px 36px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(56, 189, 248, 0.3);
    }

    &.terminal-glow-orange {
        border-color: rgba(249, 115, 22, 0.3);
        box-shadow: 
            0 12px 36px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(249, 115, 22, 0.3);
    }
}

.terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    background: rgba(22, 27, 34, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
}

.terminal-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 54px;

    .control-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;

        &.close {
            background-color: #ff5f56;
            border: 1px solid #e0443e;
        }

        &.minimize {
            background-color: #ffbd2e;
            border: 1px solid #dea123;
        }
        
        &.maximize {
            background-color: #27c93f;
            border: 1px solid #1aab29;
        }
    }
}

.terminal-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: rgba(243, 244, 246, 0.75);
    font-weight: 500;
    letter-spacing: 0.5px;

    &-icon {
        color: #10b981;
        font-weight: 700;
    }
}

.terminal-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 12px;
    background: rgba(16, 185, 129, 0.12);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.25);
    letter-spacing: 0.8;

    .badge-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #10b981;
        box-shadow: 0 0 6px #10b981;
        animation: pulse 2s infinite ease-in-out;
    }
}

.terminal-body {
    padding: 14px 16px;
    color: #f3f4f6;
    font-size: 13px;
    line-height: 1.6;
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
</style>