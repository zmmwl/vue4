<template>
  <g>
    <!-- 连接线路径 -->
    <path
      :id="id"
      :d="path"
      :class="['vue-flow__edge-path', { selected }]"
      :style="edgeStyle"
      :marker-end="`url(#arrow-${id})`"
    />
    <!-- 箭头标记 -->
    <marker
      :id="`arrow-${id}`"
      :viewBox="`0 0 ${markerSize} ${markerSize}`"
      :refX="markerSize - 2"
      :refY="markerSize / 2"
      :markerWidth="markerSize"
      :markerHeight="markerSize"
      :orient="auto-start-reverse"
    >
      <polygon
        :points="`0,0 ${markerSize},${markerSize / 2} 0,${markerSize}`"
        :fill="markerColor"
        class="arrow-head"
      />
    </marker>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EdgeProps, getBezierPath } from '@vue-flow/core';

const props = defineProps<EdgeProps & { selected?: boolean }>();

const markerSize = 12;

const path = computed(() => {
  const [pathStr] = getBezierPath(props);
  return pathStr;
});

const edgeStyle = computed(() => ({
  fill: 'none',
  stroke: props.selected ? 'var(--color-primary)' : 'var(--color-foreground--shade-2)',
  strokeWidth: props.selected ? 3 : 2,
  transition: 'var(--transition-base)',
  cursor: 'pointer',
}));

const markerColor = computed(() =>
  props.selected ? 'var(--color-primary)' : 'var(--color-foreground--shade-2)'
);
</script>

<style scoped>
.vue-flow__edge-path {
  transition: var(--transition-base);
}

.vue-flow__edge-path:hover {
  stroke: var(--color-primary) !important;
  stroke-width: 3px !important;
}

.arrow-head {
  transition: var(--transition-base);
}

.vue-flow__edge:hover .arrow-head {
  fill: var(--color-primary) !important;
}
</style>
