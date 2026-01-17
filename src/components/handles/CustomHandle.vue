<template>
  <Handle
    :id="id"
    :type="type"
    :position="position"
    :class="['custom-handle', `handle-${shape}`, `handle-${position}`, { connecting: isConnected }]"
  >
    <template v-if="label">
      <span class="handle-label">{{ label }}</span>
    </template>
  </Handle>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

interface Props {
  id: string;
  type: 'source' | 'target';
  position: Position;
  label?: string;
  isConnected?: boolean;
  shape?: 'circle' | 'diamond';
}

withDefaults(defineProps<Props>(), {
  isConnected: false,
  shape: 'circle',
});
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
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-foreground--shade-1);
  background-color: var(--node--color--background);
  transition: var(--transition-fast);
  cursor: crosshair;
}

/* 圆形连接点 - 用于左右输入输出 (n8n 默认样式) */
.handle-circle {
  border-radius: 50%;
}

/* 菱形连接点 - 用于底部配置节点 */
.handle-diamond {
  width: 10px;
  height: 10px;
  background-color: var(--color-info);
  transform: rotate(45deg);
  border: 2px solid var(--color-info--shade-1);
}

/* 悬停效果 */
.custom-handle:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary--tint-3);
  transform: scale(1.2);
  box-shadow: 0 0 0 3px var(--canvas--color--selected-transparent);
}

.handle-diamond:hover {
  background-color: var(--color-info--tint-1);
  transform: rotate(45deg) scale(1.1);
}

/* 连接状态 */
.custom-handle.connecting {
  background-color: var(--color-primary);
  border-color: var(--color-primary--shade-1);
}

/* 左侧连接点 - 嵌入左边框 */
.handle-Left {
  left: -6px !important;
}

/* 右侧连接点 - 嵌入右边框 */
.handle-Right {
  right: -6px !important;
}

/* 顶部连接点 - 嵌入上边框 */
.handle-Top {
  top: -6px !important;
}

/* 底部连接点 - 嵌入下边框 */
.handle-Bottom {
  bottom: -6px !important;
}
</style>
