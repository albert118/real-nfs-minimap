import '@assets/main.css';

// Leaflet
import 'leaflet/dist/leaflet.css';

// Pinia
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

const vuetifyConfig = {
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
};

import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@router';
import GlobalErrorHandler from '@plugins/GlobalErrorHandler';

const app = createApp(App);

app.use(GlobalErrorHandler).use(createPinia()).use(router).use(createVuetify(vuetifyConfig));

app.mount('#app');
