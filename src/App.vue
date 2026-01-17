<template>
  <FlowCanvas />
</template>

<script setup lang="ts">
import FlowCanvas from './components/canvas/FlowCanvas.vue';
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/global.css';
@import './assets/styles/theme.css';

/* ============================================
   Vue Flow 连接线箭头标记定义
   ============================================ */

/* 定义箭头标记 */
.vue-flow__edge.marker-arrow {
  fill: var(--color-foreground--shade-2);
}

.vue-flow__edge.selected .marker-arrow,
.vue-flow__edge:hover .marker-arrow {
  fill: var(--color-primary);
}
</style>
