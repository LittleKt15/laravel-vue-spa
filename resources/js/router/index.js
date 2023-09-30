import { createRouter, createWebHistory } from 'vue-router';
import ProductComponent from '../components/ProductComponent.vue';
import ExampleComponent from '../components/ExampleComponent.vue';

const routes = [
    {
        path: '/',
        name: 'example',
        component: ExampleComponent,
    },
    {
        path: '/product',
        name: 'product',
        component: ProductComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
