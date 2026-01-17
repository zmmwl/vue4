import type { Node, Edge, Connection } from '@vue-flow/core';

// 自定义节点类型
export interface CustomNode extends Node {
  type: string;
  data: Record<string, any>;
}

// 自定义边类型
export interface CustomEdge extends Edge {
  type: string;
}

// 连接参数
export type CustomConnection = Connection;
