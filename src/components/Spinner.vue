<script lang="ts" setup>

const { show, x, y } = defineProps<{ show: boolean, x: number, y: number }>()

</script>

<template>
    <div v-show="show" class="spinner-wrap" :style="`top: ${y}px; left: ${x}px;`">
        <div class="spinner-item"></div>
        <div class="spinner-item spinner-item--2"></div>
        <div class="spinner-item spinner-item--3"></div>
    </div>
</template>

<style lang="scss" scoped>
.spinner-wrap {
    position: absolute;
}

.spinner {
    &-item {
        border: 3px solid yellow;
        border-radius: 50%;
        height: 45rem;
        width: 45rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: zoom 2s linear 0.75s infinite;

        &--2 {
            animation-delay: 1.25s;
        }

        &--3 {
            animation-delay: 1.75s;
        }
    }
}

@keyframes zoom {
    0% {
        transform: translate(-50%, -50%) scale(0.2);
        opacity: 0;
    }

    50% {
        opacity: 0.9;
    }

    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}
</style>
