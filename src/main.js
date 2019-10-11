// 入口文件  
import Vue from 'vue'//导入Vue
// 路由相关
import VueRouter from 'vue-router'//导入路由包
Vue.use(VueRouter)//注册路由
import router from './router'//导入路由组件
import app from './App.vue'//导入主入口组件
// MUI相关
import './lib/mui/css/mui.min.css'//导入MUI组件的css
import './lib/mui/css/icons-extra.css'//导入MUI扩展图标需要的css
import './lib/mui/fonts/mui-icons-extra.ttf'//导入MUI扩展图标需要的字体文件
// mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui';//按需导入mint-ui
 //按需导入的mint-ui组件注册
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// vue-resource相关
import VueResource from 'vue-resource'//导入
Vue.use(VueResource)//注册
let vm = new Vue({//构建vue实例
    el:'#app',
    render:c=>c(app),//将app主组件插入到页面中
    router,//挂载路由对象
})