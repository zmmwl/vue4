import { markRaw } from 'vue';
import CustomEdge from './CustomEdge.vue';
import type { EdgeTypes } from '@vue-flow/core';

export const edgeTypes: EdgeTypes = {
  custom: markRaw(CustomEdge),
};

export default CustomEdge;
