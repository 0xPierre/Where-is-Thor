<script lang="ts" setup>
import Spinner from '@/components/Spinner.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import { useLevelsStore } from '@/stores/levels'
import Header from '@/components/Header.vue'

import {
    getRandomCoordBetween,
    getRandomSpinnerPosition,
} from '@/helpers/utils'

document.title = 'Trouvez Faucon !'

const levelsStore = useLevelsStore()

const image = ref<null | HTMLImageElement>(null)
const pos_x = ref(0)
const pos_y = ref(0)
const showSpinner = ref<boolean>(false)
const spinnerCoo = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const modalFailed = ref<boolean>(false)
const modalSuccess = ref<boolean>(false)
const nextLevelIn = ref<number>(5)

const audios = ['/records/record_1.mp3', '/records/record_2.mp3', '/records/record_3.mp3']
const getRandomAudio = () => audios[Math.floor(Math.random() * audios.length)]

const trials = ref(0)


const randomPositionImage = () => {
    if (!image.value)
        return

    const backgroundImg = document.querySelector('.background') as HTMLDivElement;

    pos_x.value = getRandomCoordBetween(0, backgroundImg.clientWidth - 100);
    pos_y.value = getRandomCoordBetween(0, backgroundImg.clientHeight / 2);

    pos_x.value = pos_x.value + image.value.clientWidth / 2;
    pos_y.value = pos_y.value + image.value.clientHeight / 2;

    image.value.style.left = `${pos_x.value}px`;
    image.value.style.top = `${pos_y.value}px`;
}

onMounted(() => {
    randomPositionImage()
})





const showClue = () => {
    modalFailed.value = false
    spinnerCoo.value = getRandomSpinnerPosition(pos_x.value, pos_y.value)
    showSpinner.value = true;
    levelsStore.totalClues += 1
    setTimeout(() => {
        showSpinner.value = false;
    }, 4000)
}

const onClick = (event: MouseEvent) => {
    trials.value += 1
    if (event.target === image.value) {
        modalSuccess.value = true
        const interval = setInterval(() => {
            nextLevelIn.value -= 1
            if (nextLevelIn.value === 0) {
                clearInterval(interval)
                modalSuccess.value = false
                levelsStore.nextLevel()
            }
        }, 1000)
    } else {
        modalFailed.value = true

        if (trials.value % 3 === 0) {
            randomPositionImage()
        }

        const audio = new Audio(getRandomAudio())
        audio.play()
    }
}

</script>

<template>
    <div class="container">
        <Header title="Trouvez Faucon !" />
        <div class="background" @click="onClick">
            <img class="to-find" src="@/assets/images/levels/level2/tofind.png" ref="image" />
            <Spinner :show="showSpinner" :x="spinnerCoo.x" :y="spinnerCoo.y" />
        </div>
        <Modal :show="modalFailed" head-text="Dommage !" @on-close="modalFailed = false">
            <h3>Vous n'avez pas trouve Faucon, reessayez !</h3>

            <template v-if="(trials % 3 === 0)">
                <p style="margin-top: 10px;">
                    Malheureusement Faucon change d'endroit !
                </p>
            </template>

            <div class="btns">
                <Button @click="showClue" variant='primary'>
                    <vue-feather type="help-circle" size="24" />
                    <span>Indice</span>
                </Button>
                <Button @click="modalFailed = false" variant="primary">
                    <vue-feather type="x" size="24" />
                    <span>Fermer</span>
                </Button>
            </div>
        </Modal>

        <Modal :show="modalSuccess" head-text="Bien joue !">
            <h3>
                Bravo ! Tu as trouve Faucon !
            </h3>
            <div class="next-level">
                Prochain niveau dans {{ nextLevelIn }} {{ nextLevelIn > 1 ? 'secondes' : 'seconde' }}
            </div>
        </Modal>
    </div>
</template>


<style lang="scss" scoped>
.btns {
    display: flex;
    justify-content: end;
    gap: 2rem;
    margin-top: 2rem;
}

.next-level {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
}

.container {
    width: 100vw;
    height: 100vh;
}


.background {
    height: 100%;
    width: 100%;
    background-image: url('@/assets/images/levels/level2/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

img.to-find {
    position: absolute;
    width: 5rem;
    user-select: none;
    z-index: 100;
}
</style>
