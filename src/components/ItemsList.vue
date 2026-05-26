<template lang="pug">
.items-container
  h2.loading(v-if="isLoading") Загрузка данных...
  h2.empty(v-else-if="!items.length") Ничего не найдено

  template(v-else)
    ul.items-list 
      li.item(v-for="item in items" :key="item.id")
        span.id \#{{item.id}}
        span.title {{item.title}}
        span.category {{item.category}}

  .pagination(v-if="totalPages > 1 && !isLoading")
    button(
      :disabled="page <= 1"
      @click="page--"
    ) Назад
    button(
      v-for="p in totalPages"
      :key="p"
      @click="page = p"
      :class="{current: p === page}"
    ) {{p}}

    button(
      :disabled="page >= totalPages"
      @click="page++"
    ) Вперёд
</template>

<script setup lang="ts">
import type { Item } from '@/composables/useItems';

defineProps<{ items: Item[]; isLoading: boolean; totalPages: number }>();

const page = defineModel<number>('page', { default: 1 });
</script>

<style scoped>
.items-container {
  min-height: 300px;
}

.items-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: transform 0.15s, box-shadow 0.15s;
}

.item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.id {
  font-family: monospace;
  color: #999;
  font-weight: bold;
}

.title {
  flex: 1;
  font-weight: 500;
}

.category {
  background-color: #eef2f3;
  color: #475569;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

button:hover:not(:disabled) {
  border-color: #000;
  background: #f9f9f9;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current {
  background: #000;
  color: #fff;
  border-color: #000;
}

.loading, .empty {
  text-align: center;
  color: #666;
  margin-top: 3rem;
  font-weight: 400;
}
</style>