<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isSoundActivated = ref<boolean>(true)
const router = useRouter()

const levelsStore = useLevelsStore()

const startGame = () => {
    console.log('start game')
    levelsStore.startGame()
    router.push('/levels')
}

</script>

<template>
    <div class="background">
        <div class="menu">
            <div class="item" @click="startGame">
                Demarrer une partie
            </div>
            <RouterLink class="item" to="/ranking">
                Voir le classement
            </RouterLink>
        </div>

        <!-- <div class="sound">
            <vue-feather :type="isSoundActivated ? 'volume-2' : 'volume-x'" size="3.5rem"
                @click="(isSoundActivated = !isSoundActivated)" />
        </div> -->
    </div>
</template>


<style lang="scss" scoped>
.background {
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/images/starting-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.sound {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    color: #fff;
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
        padding: 1rem;
        border-radius: var(--border-radius);
        font-size: 3.5rem;
        font-weight: bold;
        cursor: pointer;
    }
}

@media screen and (max-width: 768px) {
    .menu {
        .item {
            font-size: 2rem;
        }
    }
}
</style>
