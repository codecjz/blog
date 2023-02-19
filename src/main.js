import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'github-markdown-css/github-markdown.css'
import hljs from 'highlight.js'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
