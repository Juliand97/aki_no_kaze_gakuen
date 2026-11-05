<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { members } from '@/data/members'
import { getCategorySheetImages, getMemberSheetImages, technicalSheetCategories } from '@/data/technicalSheets'

type SheetImage = { path: string; src: string }

const route = useRoute()
const username = computed(() => String(route.params.username ?? ''))
const member = computed(() => members.find((item) => item.username === username.value))
const totalImages = computed(() => getMemberSheetImages(username.value).length)
const modalTitle = ref('')
const modalImages = ref<SheetImage[]>([])
const activeImageIndex = ref(0)
const zoom = ref(1)
const isModalOpen = computed(() => modalImages.value.length > 0)
const activeImage = computed(() => modalImages.value[activeImageIndex.value])

function openModal(title: string, images: SheetImage[], index: number) {
  modalTitle.value = title
  modalImages.value = images
  activeImageIndex.value = index
  zoom.value = 1
}

function closeModal() {
  modalImages.value = []
  zoom.value = 1
}

function showPrevious() {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
    zoom.value = 1
  }
}

function showNext() {
  if (activeImageIndex.value < modalImages.value.length - 1) {
    activeImageIndex.value++
    zoom.value = 1
  }
}

function changeZoom(amount: number) {
  zoom.value = Math.min(2.5, Math.max(1, zoom.value + amount))
}

function handleKeydown(event: KeyboardEvent) {
  if (!isModalOpen.value) return
  if (event.key === 'Escape') closeModal()
  if (event.key === 'ArrowLeft') showPrevious()
  if (event.key === 'ArrowRight') showNext()
}

watch(isModalOpen, (open) => document.body.classList.toggle('sheet-modal-open', open))
window.addEventListener('keydown', handleKeydown)
onBeforeUnmount(() => {
  document.body.classList.remove('sheet-modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
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
        <header><span>0{{ index + 1 }} / 09</span><h2>{{ category.title }}</h2></header>
        <div v-if="getCategorySheetImages(member.username, category.id).length" class="technical-sheet-actions">
          <button v-for="(image, imageIndex) in getCategorySheetImages(member.username, category.id)" :key="image.path" class="button sheet-view-button" type="button" @click="openModal(category.title, getCategorySheetImages(member.username, category.id), imageIndex)">Visualizar ficha {{ String(imageIndex + 1).padStart(2, '0') }} →</button>
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

  <Teleport to="body">
    <div v-if="isModalOpen && member && activeImage" class="sheet-modal-backdrop" @click.self="closeModal">
      <section class="sheet-modal" role="dialog" aria-modal="true" :aria-label="`${modalTitle} de ${member.name}`">
        <header class="sheet-modal-header">
          <div><p class="eyebrow">{{ member.name }} · {{ activeImageIndex + 1 }} de {{ modalImages.length }}</p><h2>{{ modalTitle }}</h2></div>
          <button class="sheet-modal-close" type="button" aria-label="Cerrar ficha técnica" @click="closeModal">Cerrar ×</button>
        </header>
        <div class="sheet-modal-toolbar" aria-label="Controles de la ficha">
          <button type="button" :disabled="activeImageIndex === 0" @click="showPrevious">← Anterior</button>
          <div class="sheet-zoom-controls">
            <button type="button" :disabled="zoom === 1" aria-label="Reducir imagen" @click="changeZoom(-0.25)">−</button>
            <button type="button" aria-label="Restablecer ampliación" @click="zoom = 1">{{ Math.round(zoom * 100) }} %</button>
            <button type="button" :disabled="zoom === 2.5" aria-label="Ampliar imagen" @click="changeZoom(0.25)">+</button>
          </div>
          <button type="button" :disabled="activeImageIndex === modalImages.length - 1" @click="showNext">Siguiente →</button>
        </div>
        <div class="sheet-modal-viewport">
          <div class="sheet-modal-canvas" :style="{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }">
            <img :src="activeImage.src" :alt="`${modalTitle} de ${member.name}, imagen ${activeImageIndex + 1}`">
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>
