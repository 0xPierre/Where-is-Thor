import http from '@/helpers/http'
import { acceptHMRUpdate, defineStore } from 'pinia'
import router from '@/router'


export const useLevelsStore = defineStore({
    id: 'levels',

    state: () => ({
        level: 1,
        timer: 180,
        maxTimer: 180,
        timerInterval: null,
        inGame: false,
        totalClues: 0,
        canSend: false,
        score: 0,
    }),

    getters: {
    },

    actions: {
        loseGameByTime() {
            if (this.timerInterval)
                clearInterval(this.timerInterval)
            this.inGame = false
            router.push('/game-over')
        },
        startGame() {
            this.inGame = true
            this.timer = this.maxTimer
            this.level = 1
            this.totalClues = 0
            // @ts-ignore
            this.timerInterval = setInterval(() => {
                this.timer--
                if (this.timer === 0) {
                    this.loseGameByTime()
                }
            }, 1000)
            this.level = 1
        },
        winGame() {
            if (this.timerInterval)
                clearInterval(this.timerInterval)
            this.inGame = false
            this.canSend = true

            let score = 0
            score += (this.maxTimer - this.timer) * 3.5
            score -= this.totalClues * 10
            this.score = Math.round(score)

            router.push('/ranking')
        },
        nextLevel() {
            this.level++
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLevelsStore, import.meta.hot))
}
