<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { doc, getDocs, where, collection, query, orderBy, limit, setDoc } from 'firebase/firestore'

import { db } from '@/helpers/firebase'

const isSoundActivated = ref<boolean>(true)
const router = useRouter()
const users: any = ref([])

const username = ref('')

const levelsStore = useLevelsStore()

const getUsers = async () => {
    const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(5))
    const querySnapshot = await getDocs(q)
    users.value = []
    querySnapshot.forEach((doc) => {
        users.value.push(doc.data())
    })
}

onMounted(() => {
    getUsers()
})

const saveRanking = async () => {
    if (levelsStore.canSend && username.value !== '') {
        await setDoc(doc(db, 'scores', username.value), {
            username: username.value,
            score: levelsStore.score
        })

        levelsStore.canSend = false
        getUsers()
    }
}

</script>

<template>
    <div class="background">
        <div class="menu">
            <div class="item">
                Classement
            </div>
            <div class="ranking">
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Pseudo</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.score }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="levelsStore.canSend">
                <div class="add-score">
                    Ajouter mon score : {{ levelsStore.score }}
                    <input v-model="username" placeholder="Pseudo" type="text" />
                </div>
                <div to="/" class="item" style="margin-top: 1rem; display: inline-block;" @click="saveRanking">
                    Enregistrer
                </div>
            </div>
            <RouterLink class="item" to="/">
                Retour
            </RouterLink>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.background {
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/images/win.jpg');
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
        font-size: 2rem;
        font-weight: bold;

        &:last-child {
            cursor: pointer;
        }
    }

    .ranking {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: rgba(255, 0, 0, 0.7);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        color: #fff;

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 1rem;

            thead {
                tr {
                    th {
                        padding: 1rem;
                    }
                }
            }

            tbody {
                tr {
                    &:nth-child(odd) {
                        background-color: rgba(255, 255, 255, 0.2);
                    }

                    td {
                        padding: 1rem;
                    }
                }
            }
        }
    }

    .add-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 0, 0, 0.7);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        color: #fff;
        font-size: 1.6rem;

        input {
            width: 100%;
            padding: 1rem;
            border-radius: var(--border-radius);
            border: none;
            outline: none;
            font-size: 2rem;
            font-weight: bold;
            color: rgba(255, 0, 0, 0.7);
        }
    }
}
</style>
