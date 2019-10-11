//导入vue-router的包
import VueRouter from 'vue-router'
// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'//首页组件
import MemberContainer from './components/tabbar/MemberContainer.vue'//会员组件
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'//购物车组件
import SearchContainer from './components/tabbar/SearchContainer.vue'//搜索组件

//创建路由对象
const router = new VueRouter({
    routes:[
        { path: '/', redirect: "/home" },//默认路由 重定向
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer }
    ],
    linkActiveClass:'mui-active',//路由选中高亮显示  覆盖router-link默认的选中类 router-link-active
})

export default router ;//暴露路由