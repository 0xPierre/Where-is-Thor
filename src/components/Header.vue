<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels'
const { title } = defineProps<{ title: string }>()

const levelsStore = useLevelsStore()

</script>

<template>
    <div class="timer">
        {{ levelsStore.timer }}
    </div>
    <h1 class="level-title">
        {{ title }}
    </h1>
    <div class="level">
        <span>
            Niveau {{ levelsStore.level }} sur 4
        </span>
        <div class="progress-bar" :style="`width: ${levelsStore.level / 4 * 100}%;`" />
    </div>
</template>

<style lang="scss" scoped>
.timer,
.level {
    position: absolute;
    padding: 10px 20px;
    background-color: rgba(255, 0, 0, 0.7);
    border-radius: var(--border-radius);
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 1;

    span {
        z-index: 4;
    }

    .progress-bar {
        width: 25%;
        height: 100%;
        background-color: rgba(255, 221, 0, 0.766);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: var(--border-radius);
        z-index: 3;
    }
}

.timer {
    top: 1rem;
    left: 1rem;
}

.level {
    top: 1rem;
    right: 1rem;
}

h1.level-title {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    z-index: 2;
    background-color: rgba(255, 0, 0, 0.7);
    padding: .7rem 1rem;
    border-radius: var(--border-radius);
    font-size: 1.4rem;
}
</style>
