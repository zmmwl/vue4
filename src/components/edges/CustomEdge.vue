<template>
  <BaseEdge
    :id="id"
    :path="path[0]"
    :marker-end="markerEnd"
    :style="edgeStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeProps, getBezierPath } from '@vue-flow/core';

const props = defineProps<EdgeProps>();

const path = computed(() => getBezierPath(props));

const edgeStyle = computed(() => ({
  stroke: '#94a3b8',
  strokeWidth: 2,
}));

const markerEnd = computed(() => ({
  type: 'arrowclosed',
  color: '#94a3b8',
  width: 12,
  height: 12,
}));
</script>
