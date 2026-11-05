<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const open = ref(false)
const route = useRoute()
const links = [['Inicio', '/'], ['Lookbook', '/lookbook'], ['Fichas técnicas', '/fichas-tecnicas'], ['Galería', '/galeria'], ['Integrantes', '/integrantes'], ['Contacto', '/contacto']]
watch(() => route.fullPath, () => { open.value = false })
watch(open, (value) => { document.body.classList.toggle('menu-open', value) })
onBeforeUnmount(() => document.body.classList.remove('menu-open'))
</script>
<template>
  <a class="skip-link" href="#main-content">Saltar al contenido</a>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="Aki no Kaze Gakuen, inicio"><img class="brand-mark" src="/images/brand/aki-no-kaze-monogram.png" alt="" width="52" height="52"><span>Aki no Kaze<small>Gakuen · Collection</small></span></RouterLink>
    <button class="menu-button" type="button" :aria-expanded="open" aria-controls="site-nav" @click="open = !open">{{ open ? 'Cerrar' : 'Menú' }}</button>
    <nav id="site-nav" :class="['site-nav', { open }]" aria-label="Navegación principal">
      <RouterLink v-for="link in links" :key="link[1]" :to="link[1]">{{ link[0] }}</RouterLink>
      <a href="https://www.instagram.com/akinokaze.collection/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
    </nav>
  </header>
</template>
