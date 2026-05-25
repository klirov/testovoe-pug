import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/search',
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/Search.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
