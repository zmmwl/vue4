import dagre from 'dagre';
import type { Node, Edge } from '@vue-flow/core';

interface LayoutedNode extends Node {
  position: { x: number; y: number };
}

export function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'BT' | 'LR' | 'RL' = 'TB'
): LayoutedNode[] {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 80,
    ranksep: 120,
  });

  // 添加节点到图
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.type === 'dataSource' ? 100 : 200,
      height: node.type === 'dataSource' ? 100 : 80,
    });
  });

  // 添加边到图
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 执行布局
  dagre.layout(dagreGraph);

  // 返回带位置的节点
  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - (node.type === 'dataSource' ? 50 : 100),
        y: nodeWithPosition.y - (node.type === 'dataSource' ? 50 : 40),
      },
    } as LayoutedNode;
  });
}
