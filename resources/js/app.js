import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProductComponent from './components/ProductComponent.vue';
import ExampleComponent from './components/ExampleComponent.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'product',
            component: ProductComponent
        },
        {
            path: '/example',
            name: 'example',
            component: ExampleComponent
        },
    ],
});

const app = createApp(ProductComponent);
app.use(router);
app.mount('#app');

