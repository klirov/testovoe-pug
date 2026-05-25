<template lang="pug">
.search-page 
  h1 Поиск айтемов

  filter-form(
    v-model:query="filters.query"
    v-model:category="filters.category"
  )

  items-list(
    :items="items"
    :is-loading="isLoading"
    :total-pages="totalPages"
    v-model:page="filters.page"
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

const filters = ref<Filters>({
  query: '',
  category: '',
  page: 1,
});

const isQueryChanging = ref(false);

const debouncedSearch = debounce(async () => {
  await updateUrlAndFetch();
  isQueryChanging.value = false;
}, 500);

async function updateUrlAndFetch() {
  await router.replace({
    query: {
      query: filters.value.query || undefined,
      category: filters.value.category || undefined,
      page: filters.value.page > 1 ? filters.value.page : undefined,
    },
  });

  fetchItems(filters.value);
}

onMounted(() => {
  filters.value.query = (route.query.query as string) || '';
  filters.value.category = (route.query.category as string) || '';
  filters.value.page = Number(route.query.page) || 1;

  fetchItems(filters.value);
});

watch(
  [() => filters.value.query, () => filters.value.category],
  (newValues, oldValues) => {
    filters.value.page = 1;

    if (newValues[0] !== oldValues[0]) {
      isQueryChanging.value = true;
    }
  },
);

watch(
  filters,
  async () => (isQueryChanging.value ? debouncedSearch() : updateUrlAndFetch()),
  {
    deep: true,
  },
);
</script>

<style scoped></style>
