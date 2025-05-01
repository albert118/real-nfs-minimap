import '@assets/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@router';
import GlobalErrorHandler from '@plugins/GlobalErrorHandler';
import LeafletConfiguration from '@plugins/LeafletConfiguration';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

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

const app = createApp(App)
    .use(GlobalErrorHandler)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .use(LeafletConfiguration);

app.mount('#app');
