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
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type Filters, useItems } from '@/composables/useItems';
import { debounce } from '@/utils/debounce';

import FilterForm from '@/components/FilterForm.vue';
import ItemsList from '@/components/ItemsList.vue';

const route = useRoute();
const router = useRouter();
const { items, isLoading, totalPages, fetchItems } = useItems();

const query = ref('');
const category = ref('');
const page = ref(1);

const debouncedSearch = debounce(async () => await updateUrlAndFetch(), 500);

async function updateUrlAndFetch() {
  await router.replace({
    query: {
      query: query.value || undefined,
      category: category.value || undefined,
      page: page.value > 1 ? page.value : undefined
    }
  });

  fetchItems({
    query: query.value,
    category: category.value,
    page: page.value
  });
}

onMounted(() => {
  query.value = (route.query.query as string) || '';
  category.value = (route.query.category as string) || '';
  page.value = Number(route.query.page) || 1;

  fetchItems({
    query: query.value,
    category: category.value,
    page: page.value
  });
});

watch(query, () => {
  page.value = 1;
  debouncedSearch();
});
watch(category, () => {
  page.value = 1;
  updateUrlAndFetch();
});
watch(page, () => {
  updateUrlAndFetch();
});
</script>

<style scoped></style>
