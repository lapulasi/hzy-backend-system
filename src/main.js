// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import globalTestData from './shared/data.js'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './axios/api'

Vue.use(VueAxios, axios)
Vue.prototype.GLOBAL = globalTestData
// Vue.prototype.BASEURL = Api.baseUrl;
Vue.prototype.API = api;

// todo
// cssVars()

Vue.use(BootstrapVue)
// Vue.use(iView);
// Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
