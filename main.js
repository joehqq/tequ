import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './node_modules/swiper/dist/css/swiper.css'

App.mpType = 'app'
Vue.use(uView);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
const app = new Vue({
    ...App
})
app.$mount()
 
 
 

 

 