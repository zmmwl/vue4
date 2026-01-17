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
  font-size: 10px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* n8n 风格连接点样式 */
.custom-handle {
  width: 10px;
  height: 10px;
  background-color: #808080;
  border: 2px solid #ffffff;
  transition: all 0.15s ease;
  cursor: crosshair;
}

/* 圆形连接点 - 用于左右输入输出 */
.handle-circle {
  border-radius: 50%;
}

/* 菱形连接点 - 用于底部配置节点 */
.handle-diamond {
  width: 10px;
  height: 10px;
  background-color: #4169E1;
  transform: rotate(45deg);
  border: 2px solid #ffffff;
}

.handle-diamond:hover {
  background-color: #1E90FF;
  transform: rotate(45deg) scale(1.1);
}

/* 悬停效果 */
.custom-handle:hover {
  background-color: #A9A9A9;
  transform: scale(1.1);
  box-shadow: 0 0 0 1px #CCCCCC, 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 左侧连接点 - 嵌入左边框 */
.handle-Left {
  left: -5px !important;
}

/* 右侧连接点 - 嵌入右边框 */
.handle-Right {
  right: -5px !important;
}

/* 顶部连接点 - 嵌入上边框 */
.handle-Top {
  top: -5px !important;
}

/* 底部连接点 - 嵌入下边框 */
.handle-Bottom {
  bottom: -5px !important;
}

/* 连接状态 */
.custom-handle.connecting {
  background-color: var(--color-primary);
}
</style>
