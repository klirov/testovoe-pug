<template lang="pug">
.search-page 
  h1 Поиск айтемов

  filter-form(
    v-model:query="query"
    v-model:category="category"
  )

  items-list(
    :items="items"
    :is-loading="isLoading"
    :total-pages="totalPages"
    v-model:page="page"
  )
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useItems } from '@/composables/useItems';
import { debounce } from '@/utils/debounce';

import FilterForm from '@/components/FilterForm.vue';
import ItemsList from '@/components/ItemsList.vue';

const route = useRoute();
const router = useRouter();
const { items, isLoading, totalPages, fetchItems } = useItems();

const query = ref('');
const category = ref('');
const page = ref(1);

async function updateUrl() {
  await router.replace({
    query: {
      query: query.value || undefined,
      category: category.value || undefined,
      page: page.value > 1 ? page.value : undefined
    }
  });
}

const debouncedUpdateUrl = debounce(() => updateUrl(), 500);

watch(
  () => route.query,
  (newQuery) => {
    query.value = (newQuery.query as string) || '';
    category.value = (newQuery.category as string) || '';
    page.value = Number(newQuery.page) || 1;

    fetchItems({
      query: query.value,
      category: category.value,
      page: page.value
    });
  },
  {
    immediate: true
  }
);

watch(query, (newValue) => {
  if (newValue === (route.query.query || '')) return;
  page.value = 1;
  debouncedUpdateUrl();
});

watch(category, (newValue) => {
  if (newValue === (route.query.category || '')) return;
  page.value = 1;
  updateUrl();
});

watch(page, (newValue) => {
  if (newValue === (Number(route.query.page) || 1)) return;
  updateUrl();
});
</script>
