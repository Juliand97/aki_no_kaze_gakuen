<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import homeCollectionImage from '@/assets/img_inicio/coleccion-aki-no-kaze.png'
import { members } from '@/data/members'
import { getMemberSheetImages } from '@/data/technicalSheets'

const totalTechnicalSheets = members.reduce(
  (total, member) => total + getMemberSheetImages(member.username).length,
  0,
)
</script>
<template><div class="page home-page">
  <section class="hero"><div class="hero-copy"><p class="eyebrow">Colección académica · Otoño 2026</p><h1 tabindex="-1">Aki no Kaze<br><em>Gakuen</em></h1><p class="hero-lead">Uniformes imaginados entre hojas, aulas y memorias. Una colección de moda que convierte el otoño en lenguaje.</p><div class="actions"><RouterLink class="button primary" to="/integrantes">Conocer al equipo →</RouterLink></div></div><div class="hero-art hero-photo"><img :src="homeCollectionImage" width="1230" height="1278" alt="Tres modelos presentan atuendos blancos y verde salvia de la colección Aki no Kaze Gakuen"><span class="art-code">AKG — 00</span></div><div class="hero-caption"><span>Archivo / 01</span><span>Bogotá, Colombia</span></div></section>
  <section class="manifesto section"><SectionHeading index="01" kicker="Manifiesto" title="El otoño como uniforme"/><div class="manifesto-copy"><p>“Aki no Kaze” —el viento de otoño— nombra ese instante en que todo cambia de ritmo. La colección observa la vida académica desde la sensibilidad del atelier.</p><p>Orden y movimiento, tradición y juventud: una narrativa visual construida para ser recorrida como revista y consultada como archivo.</p></div></section>
  <section class="section"><SectionHeading index="02" kicker="La colección" title="Tres miradas, un mismo archivo" description="El proyecto reúne el trabajo de tres integrantes en una identidad compartida."/><div class="stat-grid"><article><strong>03</strong><span>integrantes</span></article><article><strong>{{ totalTechnicalSheets }}</strong><span>fichas técnicas</span></article><article><strong>01</strong><span>colección</span></article></div></section>
  <section class="palette-section section"><SectionHeading index="03" kicker="Paleta de estudio" title="Tonos de una tarde lenta"/><div class="swatches"><div class="swatch paper"><span>Creamy White</span><small>#F5EDD6</small></div><div class="swatch green"><span>Eucalyptus</span><small>#8AA282</small></div><div class="swatch rose"><span>Clay</span><small>#C08A80</small></div><div class="swatch ink"><span>Brown Bark</span><small>#5D4236</small></div></div></section>
  <section class="instagram-callout"><p class="eyebrow">Diario de colección</p><h2>Sigue el proceso, las pruebas y el detrás de escena.</h2><a class="button primary" href="https://www.instagram.com/akinokaze.collection/" target="_blank" rel="noopener noreferrer">@akinokaze.collection ↗</a></section>
</div></template>
