<template>
  <div
    :class="['data-source-node', `ds-${dataSourceType}`, { selected }]"
    :style="nodeStyle"
  >
    <!-- 节点图标 -->
    <div class="node-icon-wrapper">
      <div class="node-icon">
        <svg v-if="dataSourceType === 'database'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.59 21 12 21C16.41 21 20 19.21 20 17V7C20 4.79 16.41 3 12 3ZM12 5C15.87 5 18 6.5 18 7C18 7.5 15.87 9 12 9C8.13 9 6 7.5 6 7C6 6.5 8.13 5 12 5ZM6 9.37C7.53 10.34 9.67 11 12 11C14.33 11 16.47 10.34 18 9.37V12.63C16.47 13.66 14.33 14 12 14C9.67 14 7.53 13.34 6 12.37V9.37ZM12 19C8.13 19 6 17.5 6 17V14.37C7.53 15.34 9.67 16 12 16C14.33 16 16.47 15.34 18 14.37V17C18 17.5 15.87 19 12 19Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="dataSourceType === 'api'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7H10V10H7V7Z" fill="currentColor"/>
          <path d="M14 7H17V10H14V7Z" fill="currentColor"/>
          <path d="M7 14H10V17H7V14Z" fill="currentColor"/>
          <path d="M14 14H17V17H14V14Z" fill="currentColor"/>
          <path d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM5 5V19H19V5H5Z" fill="currentColor"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <!-- 节点内容 -->
    <div class="node-content">
      <div class="node-title">{{ data.label }}</div>
      <div class="node-type" :class="`node-type-${typeClass}`">{{ dataSourceTypeLabel }}</div>
    </div>

    <!-- 左侧输入点 - n8n 风格圆形锚点 -->
    <div class="custom-handle-wrapper handle-circle" style="left: -6px;">
      <Handle
        id="input"
        type="target"
        :position="Position.Left"
      />
    </div>

    <!-- 右侧输出点 - n8n 风格圆形锚点 -->
    <div class="custom-handle-wrapper handle-circle" style="right: -6px;">
      <Handle
        id="output"
        type="source"
        :position="Position.Right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position, type NodeProps } from '@vue-flow/core';
import type { DataSourceNodeData } from '@/types/nodes';

const props = defineProps<NodeProps & { data: DataSourceNodeData } & { selected?: boolean }>();

const dataSourceType = computed(() => props.data.dataSourceType);

const dataSourceTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    database: '数据库',
    api: 'HTTP 请求',
    file: '文件读取',
  };
  return labels[dataSourceType.value] || '数据源';
});

const typeClass = computed(() => {
  const classMap: Record<string, string> = {
    database: 'danger',
    api: 'info',
    file: 'secondary',
  };
  return classMap[dataSourceType.value] || 'primary';
});

const nodeStyle = computed(() => ({
  minWidth: '160px',
  minHeight: '60px',
}));
</script>

<style scoped>
.data-source-node {
  display: flex;
  align-items: center;
  gap: var(--spacing--2xs);
  position: relative;
  transition: var(--transition-base);
  padding: var(--spacing--2xs) var(--spacing--xs);
}

.data-source-node:hover {
  box-shadow: var(--shadow--light);
  transform: translateY(-1px);
}

.data-source-node.selected {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px var(--canvas--color--selected-transparent);
}

.node-icon-wrapper {
  flex-shrink: 0;
}

.node-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background-color: var(--color-background);
  border: 1px solid var(--border-color--light);
}

.ds-database .node-icon {
  color: var(--color-danger);
  background-color: var(--color-danger--tint-4);
  border-color: var(--color-danger--tint-3);
}

.ds-api .node-icon {
  color: var(--color-info);
  background-color: var(--color-info--tint-2);
  border-color: var(--color-info--tint-1);
}

.ds-file .node-icon {
  color: var(--color-secondary);
  background-color: rgba(124, 77, 255, 0.1);
  border-color: rgba(124, 77, 255, 0.2);
}

.node-content {
  flex: 1;
  min-width: 0;
}

.node-title {
  font-size: var(--font-size--sm);
  font-weight: var(--font-weight--medium);
  color: var(--color-text--shade-1);
  margin-bottom: 2px;
  line-height: var(--line-height--sm);
}

.node-type {
  font-size: var(--font-size--2xs);
  font-weight: var(--font-weight--regular);
  padding: 2px var(--spacing--2xs);
  border-radius: var(--radius);
  display: inline-block;
}

.node-type-primary {
  color: var(--color-primary);
  background-color: var(--color-primary--tint-3);
}

.node-type-secondary {
  color: var(--color-secondary);
  background-color: rgba(124, 77, 255, 0.1);
}

.node-type-info {
  color: var(--color-info);
  background-color: var(--color-info--tint-2);
}

.node-type-danger {
  color: var(--color-danger);
  background-color: var(--color-danger--tint-4);
}

/* 自定义Handle样式 - 现在在全局样式中定义 */
</style>
