import '@assets/main.css';

// Leaflet
import 'leaflet/dist/leaflet.css';

// Pinia
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@router';
import GlobalErrorHandler from '@plugins/GlobalErrorHandler';

const app = createApp(App);

app
  .use(GlobalErrorHandler)
  .use(createPinia())
  .use(router)
  .use(createVuetify());

app.mount('#app');
