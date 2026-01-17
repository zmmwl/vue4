<template>
  <div class="node-palette">
    <div class="palette-header">
      <div class="palette-title">节点面板</div>
    </div>

    <div class="palette-search-wrapper">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="search-icon"
      >
        <path
          d="M9.5 3C6.46 3 4 5.46 4 8.5C4 11.54 6.46 14 9.5 14C10.79 14 11.99 13.58 12.97 12.88L17.59 17.5L18.5 16.59L13.88 11.97C14.58 10.99 15 9.79 15 8.5C15 5.46 12.54 3 9.5 3ZM9.5 5C11.43 5 13 6.57 13 8.5C13 10.43 11.43 12 9.5 12C7.57 12 6 10.43 6 8.5C6 6.57 7.57 5 9.5 5Z"
          fill="currentColor"
        />
      </svg>
      <input
        type="text"
        placeholder="搜索节点..."
        class="palette-search"
        v-model="searchQuery"
      />
    </div>

    <!-- 数据源节点 -->
    <div class="palette-section">
      <div class="palette-section-title">数据源</div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'dataSource', 'database')"
      >
        <div class="palette-item-icon" style="color: var(--color-danger)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.59 21 12 21C16.41 21 20 19.21 20 17V7C20 4.79 16.41 3 12 3ZM12 5C15.87 5 18 6.5 18 7C18 7.5 15.87 9 12 9C8.13 9 6 7.5 6 7C6 6.5 8.13 5 12 5ZM6 9.37C7.53 10.34 9.67 11 12 11C14.33 11 16.47 10.34 18 9.37V12.63C16.47 13.66 14.33 14 12 14C9.67 14 7.53 13.34 6 12.37V9.37ZM12 19C8.13 19 6 17.5 6 17V14.37C7.53 15.34 9.67 16 12 16C14.33 16 16.47 15.34 18 14.37V17C18 17.5 15.87 19 12 19Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">数据库</div>
          <div class="palette-item-description">MySQL, PostgreSQL</div>
        </div>
      </div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'dataSource', 'api')"
      >
        <div class="palette-item-icon" style="color: var(--color-info)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7H10V10H7V7Z" fill="currentColor"/>
            <path d="M14 7H17V10H14V7Z" fill="currentColor"/>
            <path d="M7 14H10V17H7V14Z" fill="currentColor"/>
            <path d="M14 14H17V17H14V14Z" fill="currentColor"/>
            <path d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM5 5V19H19V5H5Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">HTTP 请求</div>
          <div class="palette-item-description">发起 API 调用</div>
        </div>
      </div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'dataSource', 'file')"
      >
        <div class="palette-item-icon" style="color: var(--color-secondary)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">读取文件</div>
          <div class="palette-item-description">CSV, JSON 文件</div>
        </div>
      </div>
    </div>

    <!-- 计算任务节点 -->
    <div class="palette-section">
      <div class="palette-section-title">隐私计算</div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'taskNode', 'PSI')"
      >
        <div class="palette-item-icon" style="color: var(--color-primary)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10.33C7 7.58 9.24 5.33 12 5.33V11.99ZM12 11.99V18.66C9.24 18.66 7 16.42 7 13.66H12V11.99ZM17 13.66C17 16.42 14.76 18.66 12 18.66V11.99H17V13.66ZM17 10.33H12V5.33C14.76 5.33 17 7.58 17 10.33Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">PSI</div>
          <div class="palette-item-description">隐私集合求交</div>
        </div>
      </div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'taskNode', 'PIR')"
      >
        <div class="palette-item-icon" style="color: var(--color-info)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">PIR</div>
          <div class="palette-item-description">隐私信息检索</div>
        </div>
      </div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'taskNode', 'MPC')"
      >
        <div class="palette-item-icon" style="color: var(--color-secondary)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">MPC</div>
          <div class="palette-item-description">多方安全计算</div>
        </div>
      </div>
      <div
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart($event, 'taskNode', 'FL')"
      >
        <div class="palette-item-icon" style="color: var(--color-warning)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6L13.5 9.5L17 11L13.5 12.5L12 16L10.5 12.5L7 11L10.5 9.5L12 6ZM17 16L16.25 17.75L14.5 18.5L16.25 19.25L17 21L17.75 19.25L19.5 18.5L17.75 17.75L17 16Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="palette-item-content">
          <div class="palette-item-label">联邦学习</div>
          <div class="palette-item-description">协作模型训练</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  dragStart: [event: DragEvent, nodeType: string, dataType: string];
}>();

const searchQuery = ref('');

function onDragStart(event: DragEvent, nodeType: string, dataType: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.setData('dataType', dataType);
    event.dataTransfer.effectAllowed = 'move';
  }
  emit('dragStart', event, nodeType, dataType);
}
</script>

<style scoped>
.node-palette {
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.palette-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing--xs) var(--spacing--2xs);
  border-bottom: 1px solid var(--border-color--light);
}

.palette-search-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing--2xs);
  padding: var(--spacing--2xs) var(--spacing--xs);
  border-bottom: 1px solid var(--border-color--light);
}

.search-icon {
  flex-shrink: 0;
  color: var(--color-text--tint-1);
}

.palette-search {
  flex: 1;
  border: none;
  outline: none;
  font-size: var(--font-size--sm);
  color: var(--color-text);
  background: transparent;
}

.palette-search::placeholder {
  color: var(--color-text--tint-1);
}

.palette-section {
  padding: var(--spacing--xs) 0;
  flex-shrink: 0;
}

.palette-section-title {
  padding: var(--spacing--2xs) var(--spacing--xs);
  font-size: var(--font-size--2xs);
  font-weight: var(--font-weight--medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text--tint-1);
}

.palette-item {
  display: flex;
  align-items: center;
  gap: var(--spacing--2xs);
  padding: var(--spacing--2xs) var(--spacing--xs);
  margin: 0 var(--spacing--2xs);
  border-radius: var(--radius);
  cursor: grab;
  transition: var(--transition-base);
}

.palette-item:hover {
  background-color: var(--color-primary--tint-3);
}

.palette-item:active {
  cursor: grabbing;
  transform: scale(0.98);
}

.palette-item-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background-color: var(--color-background);
  border: 1px solid var(--border-color--light);
  flex-shrink: 0;
}

.palette-item-content {
  flex: 1;
  min-width: 0;
}

.palette-item-label {
  font-size: var(--font-size--xs);
  font-weight: var(--font-weight--medium);
  color: var(--color-text--shade-1);
  margin-bottom: 2px;
}

.palette-item-description {
  font-size: var(--font-size--3xs);
  color: var(--color-text--tint-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
