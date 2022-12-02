import http from '@/helpers/http'
import { acceptHMRUpdate, defineStore } from 'pinia'
import router from '@/router'


export const useLevelsStore = defineStore({
    id: 'levels',

    state: () => ({
        level: 1,
        timer: 120,
        timerInterval: null,
        inGame: false,
        totalClues: 0,
    }),

    getters: {
    },

    actions: {
        loseGameByTime() {
            clearInterval(this.timerInterval)
            this.inGame = false
            router.push('/game-over')
        },
        startGame() {
            this.inGame = true
            this.timer = 180
            this.level = 1
            this.totalClues = 0
            this.timerInterval = setInterval(() => {
                this.timer--
                if (this.timer === 0) {
                    this.loseGameByTime()
                }
            }, 1000)
            this.level = 1
        },
        winGame() {
            clearInterval(this.timerInterval)
            this.inGame = false
            router.push('/win')
        },
        nextLevel() {
            this.level++
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLevelsStore, import.meta.hot))
}
