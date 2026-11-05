<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { members } from '@/data/members'
import { getCategorySheetImages, getMemberSheetImages, technicalSheetCategories } from '@/data/technicalSheets'

const route = useRoute()
const username = computed(() => String(route.params.username ?? ''))
const member = computed(() => members.find((item) => item.username === username.value))
const totalImages = computed(() => getMemberSheetImages(username.value).length)
</script>

<template>
  <div v-if="member" class="page technical-sheets-page">
    <header class="page-intro sheets-intro">
      <p class="eyebrow">Archivo técnico · {{ member.name }}</p>
      <h1 tabindex="-1">Fichas técnicas</h1>
      <p>Explora el archivo técnico de {{ member.name }} organizado por categoría.</p>
      <div class="sheet-summary" aria-live="polite"><strong>{{ totalImages }}</strong><span>{{ totalImages === 1 ? 'imagen disponible' : 'imágenes disponibles' }}</span></div>
    </header>

    <section class="technical-sheets-grid" :aria-label="`Fichas técnicas de ${member.name}`">
      <article v-for="(category, index) in technicalSheetCategories" :id="category.id" :key="category.id" class="technical-sheet-card">
        <header><span>0{{ index + 1 }} / 09</span><h2>{{ category.title }}</h2><code>{{ category.id }}</code></header>
        <div v-if="getCategorySheetImages(member.username, category.id).length" class="technical-sheet-gallery">
          <img v-for="(image, imageIndex) in getCategorySheetImages(member.username, category.id)" :key="image.path" :src="image.src" :alt="`${category.title} de ${member.name}, imagen ${imageIndex + 1}`" loading="lazy">
        </div>
        <div v-else class="technical-sheet-empty">
          <span class="technical-sheet-logo" aria-hidden="true"><img src="/images/brand/aki-no-kaze-monogram.png" alt="" width="72" height="72"></span>
          <span>Contenido pendiente</span>
        </div>
      </article>
    </section>

    <RouterLink class="button text sheets-back" to="/integrantes">← Volver a integrantes</RouterLink>
  </div>
  <div v-else class="page not-found">
    <p class="eyebrow">Archivo no disponible</p>
    <h1 tabindex="-1">Integrante no encontrada</h1>
    <p>Selecciona una integrante desde el equipo para consultar sus fichas técnicas.</p>
    <RouterLink class="button primary" to="/integrantes">Ver integrantes →</RouterLink>
  </div>
</template>
