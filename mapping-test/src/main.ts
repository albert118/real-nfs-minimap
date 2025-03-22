import '@assets/main.css';
import 'leaflet/dist/leaflet.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from '@router';
import GlobalErrorHandler from '@plugins/GlobalErrorHandler';

const app = createApp(App);

app.use(GlobalErrorHandler).use(createPinia()).use(router);

app.mount('#app');
