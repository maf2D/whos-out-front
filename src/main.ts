import { createApp } from 'vue';
import App from './app.vue';

import './style.css';
import router from './router';

const app = createApp(App);

app.use(router).mount('#app');
