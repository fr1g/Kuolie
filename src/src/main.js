import Vue from 'vue'

import App from './App.vue'
import router from './router'

// import './assets/output.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
