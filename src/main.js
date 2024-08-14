import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Import our custom CSS
import '../src/scss/styles.scss'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

//createApp(App).mount('#app')
const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
