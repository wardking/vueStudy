// 入口文件  
import Vue from 'vue'//导入Vue
import app from './App.vue'//导入主入口组件
import './lib/mui/css/mui.min.css'//导入MUI组件的css
import { Header } from 'mint-ui';//按需导入mint-ui
Vue.component(Header.name, Header); //按需导入的mint-ui组件注册
let vm = new Vue({//构建vue实例
    el:'#app',
    render:c=>c(app),//将app主组件插入到页面中
})