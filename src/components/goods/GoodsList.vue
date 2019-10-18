<template>
    <div class="goods-list">
        <!-- 老的路由跳转方式 -->
        <!-- <router-link class="goods-item" v-for="(item,index) in goodslist" :key="index" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <!-- 在网页中有两种跳转方式 -->
        <!-- 方式1：使用a标签的形式跳转 -->
        <!-- 方式2：使用window.loaction.href的形式跳转，叫做编程式导航 -->
        <div class="goods-item" v-for="(item,index) in goodslist" :key="index" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default{
    data() {
        return {
            pageindex:1,
            goodslist:[],
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){//获取商品列表
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.goodslist=this.goodslist.concat(res.body.message);
                }else{
                    Toast("获取商品列表失败")
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){//使用js形式进行路由跳转
        // 区分 this.$route  和this.$router 这两个对象
        // 其中this.$route 是路由参数对象，所以路由中的参数，params query都属于它
        // 其中this.$router 是一个路由导航对象，用它可以方便的使用 JS代码实现路由的前进后退 跳转到新的URL地址
        // 第一种方式  最简单
            // this.$router.push("/home/goodsinfo/"+id)
            // 第二种方式  传递对象
            // this.$router.push({path:"/home/goodsinfo/"+id})
            // 第三种：传递命名的路由
            this.$router.push({name:"goodsinfo",params:{id}})
        }
    },
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            min-height: 293px; 
            img{
                width: 100%;
            }
        
            .title{
                font-size: 14px;
                width: 100%;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: #e4393c;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>