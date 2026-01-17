import { markRaw } from 'vue';
import DataSourceNode from './DataSourceNode.vue';
import TaskNode from './TaskNode.vue';
import type { NodeTypes } from '@vue-flow/core';

export const nodeTypes: NodeTypes = {
  dataSource: markRaw(DataSourceNode),
  taskNode: markRaw(TaskNode),
};

export { DataSourceNode, TaskNode };
