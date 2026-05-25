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

  .pagination(v-if="items.length > 1 && !isLoading")
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
.items-list {
  list-style: none;
  padding: 0;
}
.item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.category {
  background-color: #f0f0f0;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.current {
  outline: 1px solid black;
}
</style>
