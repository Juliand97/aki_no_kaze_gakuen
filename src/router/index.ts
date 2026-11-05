import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue'), meta: { title: 'Inicio' } },
    { path: '/fichas-tecnicas', component: () => import('@/views/TechnicalSheetsView.vue'), meta: { title: 'Fichas técnicas' } },
    { path: '/galeria', component: () => import('@/views/GalleryView.vue'), meta: { title: 'Galería' } },
    { path: '/integrantes', component: () => import('@/views/MembersView.vue'), meta: { title: 'Integrantes' } },
    { path: '/contacto', component: () => import('@/views/ContactView.vue'), meta: { title: 'Contacto' } },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'Página no encontrada' } },
  ],
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title)} — Aki no Kaze Gakuen`
  requestAnimationFrame(() => document.querySelector<HTMLElement>('main h1')?.focus())
})

export default router
