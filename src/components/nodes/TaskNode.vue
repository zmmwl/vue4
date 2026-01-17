<template>
  <div
    :class="['task-node', `task-${taskType.toLowerCase()}`, { selected, executing, pinned }]"
    :style="nodeStyle"
  >
    <!-- 左侧彩色条 - n8n 风格 -->
    <div class="node-color-bar"></div>

    <!-- 节点头部 -->
    <div class="node-header">
      <div class="node-type" :class="`node-type-${typeClass}`">
        {{ taskTypeLabel }}
      </div>
      <div class="node-actions">
        <button class="action-button" @click="togglePin" title="固定节点">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 节点图标和标题 -->
    <div class="node-main">
      <div class="node-icon">
        <svg v-if="taskType === 'PSI'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10.33C7 7.58 9.24 5.33 12 5.33V11.99ZM12 11.99V18.66C9.24 18.66 7 16.42 7 13.66H12V11.99ZM17 13.66C17 16.42 14.76 18.66 12 18.66V11.99H17V13.66ZM17 10.33H12V5.33C14.76 5.33 17 7.58 17 10.33Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="taskType === 'PIR'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="taskType === 'MPC'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6L13.5 9.5L17 11L13.5 12.5L12 16L10.5 12.5L7 11L10.5 9.5L12 6ZM17 16L16.25 17.75L14.5 18.5L16.25 19.25L17 21L17.75 19.25L19.5 18.5L17.75 17.75L17 16Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="node-content">
        <div class="node-title">{{ data.label }}</div>
        <div v-if="data.description" class="node-description">{{ data.description }}</div>
      </div>
    </div>

    <!-- 左侧输入点 - n8n 风格圆形锚点 -->
    <div class="input-ports-left">
      <div
        v-for="port in inputPorts"
        :key="port.id"
        class="custom-handle-wrapper handle-circle"
        :style="{ top: `${getPortPosition(inputPorts.length, port.index || 0)}px` }"
      >
        <Handle
          :id="port.id"
          type="target"
          :position="Position.Left"
        />
      </div>
    </div>

    <!-- 右侧输出点 - n8n 风格圆形锚点 -->
    <div class="output-ports-right">
      <div
        v-for="port in outputPorts"
        :key="port.id"
        class="custom-handle-wrapper handle-circle"
      >
        <Handle
          :id="port.id"
          type="source"
          :position="Position.Right"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Handle, Position, type NodeProps } from '@vue-flow/core';
import type { TaskNodeData, TaskType, Port } from '@/types/nodes';

const props = defineProps<NodeProps & { data: TaskNodeData } & { selected?: boolean }>();

const taskType = computed(() => props.data.taskType);
const pinned = ref(false);
const executing = ref(false);

const taskTypeLabel = computed(() => {
  const labels: Record<TaskType, string> = {
    PSI: 'PSI',
    PIR: 'PIR',
    MPC: 'MPC',
    FL: '联邦学习',
  };
  return labels[taskType.value] || taskType.value;
});

const typeClass = computed(() => {
  const classMap: Record<TaskType, string> = {
    PSI: 'primary',
    PIR: 'info',
    MPC: 'secondary',
    FL: 'warning',
  };
  return classMap[taskType.value] || 'primary';
});

function togglePin() {
  pinned.value = !pinned.value;
}

function getPortPosition(totalPorts: number, portIndex: number): number {
  if (totalPorts === 1) return 30;
  const spacing = 40;
  const startOffset = (totalPorts - 1) * spacing / 2;
  return 30 + (portIndex * spacing) - startOffset;
}

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
  minWidth: '180px',
  minHeight: '80px',
}));
</script>

<style scoped>
.task-node {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: var(--transition-base);
}

.task-node:hover {
  box-shadow: var(--shadow--light);
  transform: translateY(-1px);
}

.task-node.selected {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px var(--canvas--color--selected-transparent);
}

.task-node.executing {
  border-color: var(--node--border-color--running);
  background-color: var(--node--color--background--executing);
}

.task-node.pinned {
  border-color: var(--node--border-color--pinned);
}

.node-color-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: var(--radius--lg) 0 0 var(--radius--lg);
}

.task-psi .node-color-bar {
  background-color: var(--color-primary);
}

.task-pir .node-color-bar {
  background-color: var(--color-info);
}

.task-mpc .node-color-bar {
  background-color: var(--color-secondary);
}

.task-fl .node-color-bar {
  background-color: var(--color-warning);
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing--2xs);
  padding-left: var(--spacing--xs);
}

.node-type {
  font-size: var(--font-size--2xs);
  font-weight: var(--font-weight--medium);
  padding: var(--spacing--4xs) var(--spacing--2xs);
  border-radius: var(--radius);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.node-type-warning {
  color: var(--color-warning--shade-1);
  background-color: var(--color-warning--tint-2);
}

.node-actions {
  display: flex;
  gap: var(--spacing--4xs);
}

.action-button {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: var(--radius--sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text--tint-1);
  transition: var(--transition-fast);
  padding: 0;
}

.action-button:hover {
  background-color: var(--color-neutral-125);
  color: var(--color-text);
}

.action-button svg {
  width: 12px;
  height: 12px;
}

.node-main {
  display: flex;
  gap: var(--spacing--2xs);
  padding-left: var(--spacing--xs);
  padding-right: var(--spacing--xs);
  padding-bottom: var(--spacing--2xs);
}

.node-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius--sm);
  background-color: var(--color-background);
}

.task-psi .node-icon {
  color: var(--color-primary);
}

.task-pir .node-icon {
  color: var(--color-info);
}

.task-mpc .node-icon {
  color: var(--color-secondary);
}

.task-fl .node-icon {
  color: var(--color-warning);
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

.node-description {
  font-size: var(--font-size--2xs);
  color: var(--color-text--tint-1);
  line-height: var(--line-height--md);
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
  gap: var(--spacing--2xs);
}

.input-ports-left {
  left: -6px;
}

.output-ports-right {
  right: -6px;
}

/* 自定义Handle样式 - 现在在全局样式中定义 */
</style>
