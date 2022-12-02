<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isSoundActivated = ref<boolean>(true)
const router = useRouter()

const levelsStore = useLevelsStore()
onMounted(() => {
    if (!levelsStore.inGame) {
        router.push('/')
    }
})

</script>

<template>
    <div class="background">
        <div class="menu">
            <div class="item">
                Game Over !, Temps ecoule
            </div>
            <RouterLink to="/" class="item">
                Rejouer
            </RouterLink>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.background {
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/images/gameoverbg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;

    .item {
        background-color: rgba(255, 0, 0, 0.7);
        color: var(--primary-color);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        font-size: 3.5rem;
        font-weight: bold;

        &:last-child {
            cursor: pointer;
        }
    }
}
</style>
