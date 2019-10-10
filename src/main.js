// 入口文件
import Vue from 'vue'
import app from './App.vue'
import './lib/mui/css/mui.min.css'
import { Header } from 'mint-ui';
Vue.component(Header.name, Header); 
let vm = new Vue({
    el:'#app',
    render:c=>c(app)
})