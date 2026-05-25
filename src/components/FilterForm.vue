<template lang="pug">
.filter-form
  .filter-group
    label Поиск:
    input(
      type="text"
      v-model="query"
      placeholder="Введите название..."
    )
  
  .filter-group
    label Категория:
    select(v-model="category")
      option(value="") Все
      option(value="vue") Vue
      option(value="react") React
</template>

<script setup lang="ts">
const query = defineModel<string>('query', { default: '' });
const category = defineModel<string>('category', { default: '' });
</script>

<style scoped>
.filter-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
