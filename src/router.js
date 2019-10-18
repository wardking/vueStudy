//导入vue-router的包
import VueRouter from 'vue-router'
// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'//首页组件
import MemberContainer from './components/tabbar/MemberContainer.vue'//会员组件
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'//购物车组件
import SearchContainer from './components/tabbar/SearchContainer.vue'//搜索组件
import NewsList from './components/news/NewsList.vue'//新闻列表组件
import NewsInfo from './components/news/NewsInfo.vue'//新闻详情组件
import PhotoList from './components/photos/PhotoList.vue'//图片分享组件
import PhotoInfo from './components/photos/PhotoInfo.vue'//图片详情组件
import GoodsList from './components/goods/GoodsList.vue'//商品购买页面
import GoodsInfo from './components/goods/GoodsInfo.vue'//商品详情页面
import GoodsDesc from './components/goods/goodsdesc.vue'//商品图文介绍
import GoodsComment from './components/goods/goodscomment.vue'//商品评论页面
//创建路由对象
const router = new VueRouter({
    routes:[
        { path: '/', redirect: "/home" },//默认路由 重定向
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo, name:"goodsinfo" },
        { path: '/home/goodsdesc/:id', component: GoodsDesc,name:"goodsdesc" },
        { path: '/home/goodscomment/:id', component: GoodsComment,name:"goodscomment" }
    ],
    linkActiveClass:'mui-active',//路由选中高亮显示  覆盖router-link默认的选中类 router-link-active
})

export default router ;//暴露路由