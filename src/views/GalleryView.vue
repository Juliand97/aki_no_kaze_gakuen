<script setup lang="ts">
import gallery01 from '@/assets/imag_gale/galeria-01.png'
import gallery02 from '@/assets/imag_gale/galeria-02.png'
import gallery03 from '@/assets/imag_gale/galeria-03.png'
import gallery04 from '@/assets/imag_gale/galeria-04.png'
import gallery05 from '@/assets/imag_gale/galeria-05.png'
import gallery06 from '@/assets/imag_gale/galeria-06.png'
import gallery07 from '@/assets/imag_gale/galeria-07.jpg'
import gallery08 from '@/assets/imag_gale/galeria-08.jpg'
import gallery09 from '@/assets/imag_gale/galeria-09.jpg'

const gallery = [
  { src: gallery01, alt: 'Modelo de perfil presenta un conjunto blanco con detalles verde salvia' },
  { src: gallery02, alt: 'Modelo presenta un conjunto asimétrico blanco y verde salvia' },
  { src: gallery03, alt: 'Modelo presenta un traje blanco con detalles tejidos verde salvia' },
  { src: gallery04, alt: 'Modelo posa con chaleco blanco y pantalón de pierna ancha' },
  { src: gallery05, alt: 'Modelo presenta un conjunto blanco con paneles tejidos verde salvia' },
  { src: gallery06, alt: 'Modelo sentada presenta un traje blanco y verde salvia' },
  { src: gallery07, alt: 'Modelo presenta un chaleco blanco frente a un muro de ladrillo' },
  { src: gallery08, alt: 'Modelo presenta una prenda con panel textil color arcilla' },
  { src: gallery09, alt: 'Modelo presenta un chaleco tejido verde salvia frente a un muro de ladrillo' },
]
</script>

<template><div class="page"><header class="page-intro"><p class="eyebrow">Registro visual · 09 fotografías</p><h1 tabindex="-1">Galería</h1><p>Un mosaico editorial de la colección, sus siluetas y los detalles que conectan cada propuesta.</p></header><section class="gallery-grid" aria-label="Galería editorial de Aki no Kaze Gakuen"><figure v-for="(image, index) in gallery" :key="image.src" :class="['gallery-item', `gallery-${index + 1}`]"><img :src="image.src" :alt="image.alt" width="900" height="1600" loading="lazy"><span class="gallery-index">{{ String(index + 1).padStart(2, '0') }} / AKG</span></figure></section><p class="gallery-note">Tres miradas · tres momentos · una colección.</p></div></template>
