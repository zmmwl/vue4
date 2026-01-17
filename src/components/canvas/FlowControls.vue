<template>
  <div class="flow-controls">
    <button class="control-button" @click="$emit('fitView')" title="适应视图">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
      </svg>
    </button>
    <button class="control-button" @click="$emit('zoomIn')" title="放大">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    </button>
    <button class="control-button" @click="$emit('zoomOut')" title="缩小">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M8 11h6"/>
      </svg>
    </button>
    <button class="control-button" @click="$emit('autoLayout')" title="自动布局">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    </button>
    <button class="control-button" @click="$emit('clearCanvas')" title="清空画布">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  fitView: [];
  zoomIn: [];
  zoomOut: [];
  autoLayout: [];
  clearCanvas: [];
}>();
</script>
