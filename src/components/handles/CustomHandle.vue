<template>
  <Handle
    :id="id"
    :type="type"
    :position="position"
    :class="['custom-handle', `handle-${shape}`, { connecting: isConnected }]"
    :style="handleStyle"
  >
    <template v-if="label">
      <span class="handle-label">{{ label }}</span>
    </template>
  </Handle>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position } from '@vue-flow/core';

interface Props {
  id: string;
  type: 'source' | 'target';
  position: Position;
  label?: string;
  isConnected?: boolean;
  shape?: 'circle' | 'diamond';
}

const props = withDefaults(defineProps<Props>(), {
  isConnected: false,
  shape: 'circle',
});

const handleStyle = computed(() => ({
  width: '12px',
  height: '12px',
  border: '2px solid var(--color-foreground--shade-1)',
  backgroundColor: 'var(--node--color--background)',
  borderRadius: props.shape === 'circle' ? '50%' : '2px',
  cursor: 'crosshair',
}));
</script>

<style scoped>
.handle-label {
  position: absolute;
  font-size: var(--font-size--3xs);
  color: var(--color-text--tint-1);
  white-space: nowrap;
}

/* ============================================
   n8n 风格连接点样式
   ============================================ */

.custom-handle {
  transition: var(--transition-fast);
}

/* 圆形连接点 - 用于左右输入输出 (n8n 默认样式) */
.handle-circle {
  border-radius: 50% !important;
}

/* 菱形连接点 - 用于底部配置节点 */
.handle-diamond {
  width: 10px !important;
  height: 10px !important;
  background-color: var(--color-info) !important;
  transform: rotate(45deg);
  border: 2px solid var(--color-info--shade-1) !important;
  border-radius: 2px !important;
}

.handle-diamond:hover {
  background-color: var(--color-info--tint-1) !important;
  transform: rotate(45deg) scale(1.1) !important;
}

/* 悬停效果 - 通过CSS类增强 */
.custom-handle:hover {
  border-color: var(--color-primary) !important;
  background-color: var(--color-primary--tint-3) !important;
  transform: scale(1.2) !important;
  box-shadow: 0 0 0 3px var(--canvas--color--selected-transparent) !important;
}

/* 连接状态 */
.custom-handle.connecting {
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary--shade-1) !important;
}

/* 位置调整 */
.handle-Left {
  left: -6px !important;
}

.handle-Right {
  right: -6px !important;
}

.handle-Top {
  top: -6px !important;
}

.handle-Bottom {
  bottom: -6px !important;
}
</style>
