// 入口文件  
import Vue from 'vue'//导入Vue
// 路由相关
import VueRouter from 'vue-router'//导入路由包
Vue.use(VueRouter)//注册路由
import router from './router'//导入路由组件
import app from './App.vue'//导入主入口组件
import Vuex from 'vuex'//导入Vuex
Vue.use(Vuex)//全局注册vuex

//没次进入网站先调用main.js  在初始化的时候  先从本地存储中把购物车的数据读出来存到数据中
let car = JSON.parse(localStorage.getItem('car'))|| [];
const store = new Vuex.Store({
    // 购物车状态管理
    state:{//this.$store.state.***
        car:car,//将购物车中商品的数据，用一个数组存储起来  {id：商品ID，count：要购买的数量，price：商品的单价，selected：是否被选中}
    },
    mutations:{//this.$store.commit('方法名称', 按需传递的唯一参数)
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息保存大奥store的car上
            // 分析
            // 1. 如果购物车中之前已经有这个商品了，那么只需要更新商品的数量，如果没有则直接把商品数据push到car中即可


            //假设在购物车中没有找到对应的商品
            let flag = false;
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+= parseInt(goodsinfo.count)
                    flag=true;
                    return true;
                }
            })
            // 如果循环完毕  flag还是为false  说明没有找到商品  直接将数据push到car数组中
            if(!flag){
                state.car.push(goodsinfo)
            }

            // 当car更新以后 把car数组存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){//修改商品信息
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item=>{
                if(item.id== goodsinfo.id){
                    item.count=parseInt(goodsinfo.count);
                    return true;
                }
            })
            // 当修改完商品的数量  将最新的购物车数据保存到存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFormCar(state,id){
            // 根据ID从store中的购物车删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            // 将删除完毕后的数据同步到本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            // 把最新的数据保存包本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.***    只要是car更新了  就会从新计算这个方法里面的值
        // 相当于计算属性 也相当于过滤器
        getAllCount(state){
            let c = 0;//总数量默认为0
            state.car.forEach(item=>{
                c+=item.count;
            })

            return c;
        },
        getGoodsCount(state){
            let o ={};
            state.car.forEach(item=>{
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            let f ={};
            state.car.forEach(item=>{
                f[item.id] = item.selected;
            })
            return f;
        },
        getGoodsCountAndAmount(state){
            let a ={
                count:0,//勾选的数量
                amount:0,//勾选的总价
            };
            state.car.forEach(item=>{
                if(item.selected){
                    a.count+=item.count;
                    a.amount+=item.price * item.count;
                }
            })
            return a;
        }

    },
})
// MUI相关
import './lib/mui/css/mui.min.css'//导入MUI组件的css
import './lib/mui/css/icons-extra.css'//导入MUI扩展图标需要的css
import './lib/mui/fonts/mui-icons-extra.ttf'//导入MUI扩展图标需要的字体文件
import VuePreview from 'vue-preview'//安装图片详情中缩略图需要用到的组件
Vue.use(VuePreview)//注册组件
// mint-ui
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch} from 'mint-ui';//按需导入mint-ui

Vue.use(Lazyload);//懒加载组件需要注册
 //按需导入的mint-ui组件注册
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch);
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
    store,//挂载vuex的store状态管理工具
})