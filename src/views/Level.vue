<script lang="ts" setup>
import router from '@/router';
import { useLevelsStore } from '@/stores/levels'
import { onMounted } from 'vue'
import Level1 from './Levels/Level1.vue'
import Level2 from './Levels/Level2.vue'
import Level3 from './Levels/Level3.vue'
import Level4 from './Levels/Level4.vue'

const levelsStore = useLevelsStore()

onMounted(() => {
    if (!levelsStore.inGame) {
        router.push('/')
    }
})

</script>

<template>
    <div>
        <template v-if="(levelsStore.level === 1)">
            <Level1 />
        </template>
        <template v-else-if="(levelsStore.level === 2)">
            <Level2 />
        </template>
        <template v-else-if="(levelsStore.level === 3)">
            <Level3 />
        </template>
        <template v-else-if="(levelsStore.level === 4)">
            <Level4 />
        </template>
    </div>
</template>

<style lang="ts">

</style>
