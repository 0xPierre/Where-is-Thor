import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'starting',
			component: () => import('../views/Starting.vue'),
		},
		{
			path: '/levels',
			name: 'levels',
			component: () => import('../views/Level.vue'),
		},
		{
			path: '/game-over',
			name: 'game-over',
			component: () => import('../views/GameOver.vue'),
		},
		{
			path: '/ranking',
			name: 'ranking',
			component: () => import('../views/Ranking.vue'),
		},
	]
})


export default router
