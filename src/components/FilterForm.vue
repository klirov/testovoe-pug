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
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: #fcfcfc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eaeaea;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
}

input, select {
  padding: 0.6rem 0.8rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}
</style>
