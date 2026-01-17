<template>
  <div class="flow-container" @drop="onDrop" @dragover="onDragOver">
    <!-- 节点面板 -->
    <NodePalette />

    <!-- 主画布 -->
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :default-zoom="0.8"
      :min-zoom="0.2"
      :max-zoom="2"
      :fit-view-on-init="true"
      @connect="onConnect"
    >
      <!-- 背景网格 -->
      <Background pattern="dots" :gap="20" color="#e2e8f0" />

      <!-- 控制面板 -->
      <FlowControls
        @fit-view="fitView"
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
        @auto-layout="applyAutoLayout"
        @clear-canvas="clearCanvas"
      />
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import type { Node, Edge, Connection } from '@vue-flow/core';
import { nodeTypes } from '../nodes';
import { edgeTypes } from '../edges';
import NodePalette from './NodePalette.vue';
import FlowControls from './FlowControls.vue';
import { applyDagreLayout } from '@/utils/dagreLayout';
import type { TaskType } from '@/types/nodes';

const { fitView, zoomIn, zoomOut } = useVueFlow();

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

let nodeIdCounter = 1;

function onConnect(connection: Connection) {
  edges.value.push({
    ...connection,
    type: 'custom',
    id: `e${connection.source}-${connection.target}`,
  });
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault();

  const type = event.dataTransfer?.getData('application/vueflow');
  const dataType = event.dataTransfer?.getData('dataType');

  if (!type) return;

  const position = {
    x: event.offsetX,
    y: event.offsetY,
  };

  const id = `${type}-${nodeIdCounter++}`;

  if (type === 'dataSource') {
    nodes.value.push({
      id,
      type,
      position,
      data: {
        label: `${dataType} 数据源`,
        dataSourceType: dataType,
      },
    });
  } else if (type === 'taskNode') {
    nodes.value.push({
      id,
      type,
      position,
      data: {
        label: `${dataType} 任务`,
        description: getTaskDescription(dataType as TaskType),
        taskType: dataType as TaskType,
      },
    });
  }
}

function getTaskDescription(type: TaskType): string {
  const descriptions: Record<TaskType, string> = {
    PSI: '隐私集合求交',
    PIR: '私有信息检索',
    MPC: '多方安全计算',
    FL: '联邦学习',
  };
  return descriptions[type] || '';
}

function applyAutoLayout() {
  nodes.value = applyDagreLayout(nodes.value, edges.value, 'TB');
}

function clearCanvas() {
  nodes.value = [];
  edges.value = [];
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.flow-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.vue-flow {
  background-color: #f8f9fa;
}
</style>
