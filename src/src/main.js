import Vue from 'vue'

import App from './App.vue'
import router from './router'

// import '../public/output.css'
// import '../public/sfi.ttf'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
