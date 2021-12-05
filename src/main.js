import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { throttle, debounce } from './util/public';

const app = createApp(App)
app.config.globalProperties.throttle = throttle
app.config.globalProperties.debounce = debounce

app.use(store).use(router).mount('#app')
