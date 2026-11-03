<script setup lang="ts">defineProps<{ index: string; kicker: string; title: string; description?: string }>()</script>
<template><header class="section-heading"><span class="section-index">{{ index }}</span><div><p class="eyebrow">{{ kicker }}</p><h2>{{ title }}</h2><p v-if="description" class="section-copy">{{ description }}</p></div></header></template>
