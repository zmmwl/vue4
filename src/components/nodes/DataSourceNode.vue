<template>
  <div :class="['data-source-node', `ds-${dataSourceType}`, { selected }]" :style="nodeStyle">
    <!-- 左侧彩色条 -->
    <div class="node-color-bar"></div>

    <!-- 左侧图标 -->
    <div class="node-icon">
      <svg v-if="dataSourceType === 'database'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.59 21 12 21C16.41 21 20 19.21 20 17V7C20 4.79 16.41 3 12 3ZM12 5C15.87 5 18 6.5 18 7C18 7.5 15.87 9 12 9C8.13 9 6 7.5 6 7C6 6.5 8.13 5 12 5ZM6 9.37C7.53 10.34 9.67 11 12 11C14.33 11 16.47 10.34 18 9.37V12.63C16.47 13.66 14.33 14 12 14C9.67 14 7.53 13.34 6 12.37V9.37ZM12 19C8.13 19 6 17.5 6 17V14.37C7.53 15.34 9.67 16 12 16C14.33 16 16.47 15.34 18 14.37V17C18 17.5 15.87 19 12 19Z" fill="currentColor"/>
      </svg>
      <svg v-else-if="dataSourceType === 'api'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 7H10V10H7V7Z" fill="currentColor"/>
        <path d="M14 7H17V10H14V7Z" fill="currentColor"/>
        <path d="M7 14H10V17H7V14Z" fill="currentColor"/>
        <path d="M14 14H17V17H14V14Z" fill="currentColor"/>
        <path d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM5 5V19H19V5H5Z" fill="currentColor"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
      </svg>
    </div>

    <!-- 节点信息 -->
    <div class="node-content">
      <div class="node-title">{{ data.label }}</div>
      <div class="node-type">{{ dataSourceTypeLabel }}</div>
    </div>

    <!-- 左侧输入点 - n8n 风格圆形锚点 -->
    <Handle
      id="input"
      type="target"
      :position="Position.Left"
      shape="circle"
    />

    <!-- 右侧输出点 - n8n 风格圆形锚点 -->
    <Handle
      id="output"
      type="source"
      :position="Position.Right"
      shape="circle"
    />
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
    database: 'Database',
    api: 'HTTP Request',
    file: 'Read File',
  };
  return labels[dataSourceType.value] || 'Data Source';
});

const nodeStyle = computed(() => ({
  backgroundColor: '#ffffff',
  border: props.selected ? '2px solid #ff6d5a' : '1px solid #d1d5db',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  minWidth: '200px',
  minHeight: '60px',
  padding: '0',
}));
</script>

<style scoped>
.data-source-node {
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.15s ease;
}

.data-source-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.data-source-node.selected {
  border-color: #ff6d5a !important;
  box-shadow: 0 0 0 3px rgba(255, 109, 90, 0.1);
}

.node-color-bar {
  width: 4px;
  height: 100%;
  border-radius: 8px 0 0 8px;
}

.ds-database .node-color-bar {
  background-color: #ff6d5a;
}

.ds-api .node-color-bar {
  background-color: #5b8ff9;
}

.ds-file .node-color-bar {
  background-color: #7c4dff;
}

.node-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
}

.ds-database .node-icon {
  color: #ff6d5a;
}

.ds-api .node-icon {
  color: #5b8ff9;
}

.ds-file .node-icon {
  color: #7c4dff;
}

.node-content {
  flex: 1;
  padding: 12px;
}

.node-title {
  font-size: 14px;
  font-weight: 500;
  color: #303134;
  margin-bottom: 2px;
}

.node-type {
  font-size: 12px;
  color: #5f6368;
}
</style>
