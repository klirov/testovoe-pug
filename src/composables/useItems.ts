import { ref } from 'vue';

export interface Item {
  id: number;
  title: string;
  category: string;
}
export interface Filters {
  query: string;
  category: string;
  page: number;
}

const mockDatabase: Item[] = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  title: `Тестовый айтем ${i + 1}`,
  category: i % 3 === 0 ? 'vue' : 'react'
}));

export function useItems() {
  const perPage = 10;

  const items = ref<Item[]>([]);
  const totalPages = ref<number>(0);
  const isLoading = ref<boolean>(false);

  // храним айдишник действующего фетча, чтобы проверять запрос на stale
  // в зависимости от требуемого функционала можно вынести за функцию чтобы обеспечить синглтон, но в рамках данного ТЗ - не требуется
  let currentRequestId = 0;

  async function fetchItems(filters: Filters) {
    const requestId = ++currentRequestId;
    isLoading.value = true;

    try {
      // имитация фетча c динамическим временем запроса
      const randomDelay = 200 + Math.random() * 600;
      await new Promise((res) => setTimeout(res, randomDelay));

      // выходим если есть более новый запрос
      if (requestId !== currentRequestId) return;

      let filteredItems = mockDatabase;

      if (filters.query) {
        const q = filters.query.toLowerCase().trim();
        filteredItems = filteredItems.filter((item) =>
          item.title.toLowerCase().trim().includes(q)
        );
      }

      if (filters.category) {
        filteredItems = filteredItems.filter(
          (item) => item.category === filters.category
        );
      }

      totalPages.value = Math.ceil(filteredItems.length / perPage);

      const safePage = Math.min(filters.page, totalPages.value || 1);

      const start = (safePage - 1) * perPage;

      items.value = filteredItems.slice(start, start + perPage);
    } finally {
      if (requestId === currentRequestId) {
        isLoading.value = false;
      }
    }
  }

  return {
    items,
    totalPages,
    isLoading,
    fetchItems
  };
}
