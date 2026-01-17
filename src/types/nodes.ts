// 任务类型枚举
export enum TaskType {
  PSI = 'PSI',
  PIR = 'PIR',
  MPC = 'MPC',
  FL = 'FL',
}

// 节点类型枚举
export enum NodeType {
  DATA_SOURCE = 'dataSource',
  TASK = 'taskNode',
}

// 数据源节点数据
export interface DataSourceNodeData {
  label: string;
  icon?: string;
  dataSourceType: 'database' | 'api' | 'file';
}

// 计算任务节点数据
export interface TaskNodeData {
  label: string;
  description?: string;
  taskType: TaskType;
}

// 端口定义
export interface Port {
  id: string;
  label?: string;
  index?: number;
}
