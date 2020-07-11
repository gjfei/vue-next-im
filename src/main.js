import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from '@/components/Icon'

import 'normalize.css'
const app = createApp(App)

app.component('icon', Icon)
app.use(router).use(store).mount('#app')
