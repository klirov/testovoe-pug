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
  category: i % 3 === 0 ? 'vue' : 'react',
}));

export function useItems() {
  const perPage = 10;

  const items = ref<Item[]>([]);
  const totalPages = ref<number>(0);
  const isLoading = ref<boolean>(false);

  async function fetchItems(filters: Filters) {
    isLoading.value = true;

    // имитация фетча
    await new Promise((res) => setTimeout(res, 600));
    let filteredItems = mockDatabase;

    if (filters.query) {
      const q = filters.query.toLowerCase().trim();
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().trim().includes(q),
      );
    }

    if (filters.category) {
      filteredItems = filteredItems.filter(
        (item) => item.category === filters.category,
      );
    }

    totalPages.value = Math.ceil(filteredItems.length / perPage);

    const safePage = Math.min(filters.page, totalPages.value || 1);

    const start = (safePage - 1) * perPage;

    items.value = filteredItems.slice(start, start + perPage);
    isLoading.value = false;
  }

  return {
    items,
    totalPages,
    isLoading,
    fetchItems,
  };
}
