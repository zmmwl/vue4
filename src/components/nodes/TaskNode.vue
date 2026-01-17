<template>
  <div :class="['task-node', `task-${taskType.toLowerCase()}`, { selected }]" :style="nodeStyle">
    <!-- 左侧彩色条 -->
    <div class="node-color-bar"></div>

    <!-- 左侧图标 -->
    <div class="node-icon">
      <svg v-if="taskType === 'PSI'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10.33C7 7.58 9.24 5.33 12 5.33V11.99ZM12 11.99V18.66C9.24 18.66 7 16.42 7 13.66H12V11.99ZM17 13.66C17 16.42 14.76 18.66 12 18.66V11.99H17V13.66ZM17 10.33H12V5.33C14.76 5.33 17 7.58 17 10.33Z" fill="currentColor"/>
      </svg>
      <svg v-else-if="taskType === 'PIR'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14H20.5L18 19H13L15.5 14ZM5.5 5L8 10H3L5.5 5ZM5.5 19L3 14H8L5.5 19ZM12 2L14.5 7H9.5L12 2ZM12 22L9.5 17H14.5L12 22Z" fill="currentColor"/>
        <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
      </svg>
      <svg v-else-if="taskType === 'MPC'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6L13.5 9.5L17 11L13.5 12.5L12 16L10.5 12.5L7 11L10.5 9.5L12 6ZM17 16L16.25 17.75L14.5 18.5L16.25 19.25L17 21L17.75 19.25L19.5 18.5L17.75 17.75L17 16Z" fill="currentColor"/>
      </svg>
    </div>

    <!-- 节点信息 -->
    <div class="node-content">
      <div class="node-title">{{ data.label }}</div>
      <div class="node-type">{{ taskTypeLabel }}</div>
      <div v-if="data.description" class="node-description">{{ data.description }}</div>
    </div>

    <!-- 左侧输入点 - n8n 风格圆形锚点 -->
    <div class="input-ports-left">
      <Handle
        v-for="port in inputPorts"
        :key="port.id"
        :id="port.id"
        type="target"
        :position="Position.Left"
        shape="circle"
        :style="{ top: `${((inputPorts.length > 1 ? port.index || 0 : 0) * 40 + 30)}px` }"
      />
    </div>

    <!-- 右侧输出点 - n8n 风格圆形锚点 -->
    <div class="output-ports-right">
      <Handle
        v-for="port in outputPorts"
        :key="port.id"
        :id="port.id"
        type="source"
        :position="Position.Right"
        shape="circle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position, type NodeProps } from '@vue-flow/core';
import type { TaskNodeData, TaskType, Port } from '@/types/nodes';

const props = defineProps<NodeProps & { data: TaskNodeData } & { selected?: boolean }>();

const taskType = computed(() => props.data.taskType);

const taskTypeLabel = computed(() => {
  const labels: Record<TaskType, string> = {
    PSI: 'PSI',
    PIR: 'PIR',
    MPC: 'MPC',
    FL: 'Federated Learning',
  };
  return labels[taskType.value] || taskType.value;
});

const inputPorts = computed<Port[]>(() => {
  const portCount = getInputPortCount(taskType.value);
  return Array.from({ length: portCount }, (_, i) => ({
    id: `input-${i}`,
    label: `输入${i + 1}`,
    index: i,
  }));
});

const outputPorts = computed<Port[]>(() => {
  const portCount = getOutputPortCount(taskType.value);
  return Array.from({ length: portCount }, (_, i) => ({
    id: `output-${i}`,
    label: `输出${i + 1}`,
  }));
});

function getInputPortCount(type: TaskType): number {
  const counts: Record<TaskType, number> = {
    PSI: 2,
    PIR: 1,
    MPC: 2,
    FL: 2,
  };
  return counts[type] || 1;
}

function getOutputPortCount(type: TaskType): number {
  const counts: Record<TaskType, number> = {
    PSI: 1,
    PIR: 1,
    MPC: 1,
    FL: 1,
  };
  return counts[type] || 1;
}

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
.task-node {
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.15s ease;
}

.task-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.task-node.selected {
  border-color: #ff6d5a !important;
  box-shadow: 0 0 0 3px rgba(255, 109, 90, 0.1);
}

.node-color-bar {
  width: 4px;
  height: 100%;
  border-radius: 8px 0 0 8px;
}

.task-psi .node-color-bar {
  background-color: #ff6d5a;
}

.task-pir .node-color-bar {
  background-color: #5b8ff9;
}

.task-mpc .node-color-bar {
  background-color: #7c4dff;
}

.task-fl .node-color-bar {
  background-color: #ffab00;
}

.node-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
}

.task-psi .node-icon {
  color: #ff6d5a;
}

.task-pir .node-icon {
  color: #5b8ff9;
}

.task-mpc .node-icon {
  color: #7c4dff;
}

.task-fl .node-icon {
  color: #ffab00;
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
  margin-bottom: 2px;
}

.node-description {
  font-size: 11px;
  color: #80868b;
}

/* n8n 风格的左右连接点容器 */
.input-ports-left,
.output-ports-right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.input-ports-left {
  left: 0;
}

.output-ports-right {
  right: 0;
}
</style>
