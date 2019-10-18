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
import VuePreview from 'vue-preview'//安装图片详情中缩略图需要用到的组件
Vue.use(VuePreview)//注册组件
// mint-ui
import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';//按需导入mint-ui

Vue.use(Lazyload);//懒加载组件需要注册
 //按需导入的mint-ui组件注册
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// vue-resource相关
import VueResource from 'vue-resource'//导入
Vue.use(VueResource)//注册
Vue.http.options.root="http://www.liulongbin.top:3005"//配置全局请求的根路径
Vue.http.options.emulateJSON = true;//全局设置post时候的表单数据格式组织形式   application/x-www-form-urlencoded

// 定义全局的过滤器
import moment from 'moment'//导入时间插件
Vue.filter('dataFormat',(dataStr,pattern="YYYY-MM-DD HH:mm:ss")=>{
    // 安装了一个npm组件 npm i moment -S 用来格式化时间
    return moment(dataStr).format(pattern);
})
let vm = new Vue({//构建vue实例
    el:'#app',
    render:c=>c(app),//将app主组件插入到页面中
    router,//挂载路由对象
})