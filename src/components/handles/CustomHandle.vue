<template>
  <div
    :class="['custom-handle-wrapper', `handle-${shape}`, { connecting: isConnected }]"
    :style="wrapperStyle"
  >
    <Handle
      :id="id"
      :type="type"
      :position="position"
      :style="innerStyle"
    />
  </div>
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

const wrapperStyle = computed(() => ({
  position: 'absolute',
  left: props.position === 'left' ? '-6px' : props.position === 'right' ? '-6px' : 'auto',
  right: props.position === 'right' ? '-6px' : 'auto',
  top: props.position === 'top' ? '-6px' : 'auto',
  bottom: props.position === 'bottom' ? '-6px' : 'auto',
  pointerEvents: 'none',
}));

const innerStyle = computed(() => ({
  width: '12px',
  height: '12px',
  border: '2px solid var(--color-foreground--shade-1)',
  backgroundColor: 'var(--node--color--background)',
  borderRadius: props.shape === 'circle' ? '50%' : '2px',
  cursor: 'crosshair',
  transition: 'var(--transition-fast)',
}));
</script>

<style scoped>
.custom-handle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================
   n8n 风格连接点样式
   ============================================ */

.custom-handle-wrapper {
  transition: var(--transition-fast);
}

/* 圆形连接点 - 用于左右输入输出 (n8n 默认样式) */
.handle-circle .vue-flow__handle {
  border-radius: 50% !important;
}

/* 菱形连接点 - 用于底部配置节点 */
.handle-diamond .vue-flow__handle {
  width: 10px !important;
  height: 10px !important;
  background-color: var(--color-info) !important;
  border: 2px solid var(--color-info--shade-1) !important;
}

/* 悬停效果 */
.custom-handle-wrapper:hover .vue-flow__handle {
  border-color: var(--color-primary) !important;
  background-color: var(--color-primary--tint-3) !important;
  transform: scale(1.2) !important;
  box-shadow: 0 0 0 3px var(--canvas--color--selected-transparent) !important;
}

/* 连接状态 */
.custom-handle-wrapper.connecting .vue-flow__handle {
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary--handleStyle) !important;
}
</style>
