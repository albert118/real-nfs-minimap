import '@assets/main.css';

// Leaflet
import 'leaflet/dist/leaflet.css';

// Pinia
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@router';
import GlobalErrorHandler from '@plugins/GlobalErrorHandler';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

const app = createApp(App);

app.use(GlobalErrorHandler).use(createPinia()).use(router).use(vuetify);

app.mount('#app');
