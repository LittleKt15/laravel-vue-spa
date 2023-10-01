import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './bootstrap';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'
import Swal from 'sweetalert2'
import VueProgressBar from "@aacassandra/vue3-progressbar";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);
const options = {
    color: "#4FC08D",
    failedColor: "#dc3545",
    thickness: "10px",
    transition: {
        speed: "0.2",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};

app.use(router);
app.use(VueProgressBar, options);
app.use(LoadingPlugin);

app.component('Bootstrap5Pagination', Bootstrap5Pagination);
app.component('AlertError', AlertError);

app.config.globalProperties.$swal = Swal;

app.mount('#app');
