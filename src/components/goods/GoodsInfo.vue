<template>
    <div class="goodsinfo-container">
       <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="flag"></div>
        </transition>
        <!-- 商品轮播区域 -->
        <div class="mui-card">
			<swiper :slideshowList="lunbotu" :isfull="false"></swiper>
		</div>   
        <!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
				</div>
			</div>
		</div>	
			<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品的参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">					
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.add_time | dataFormat}}</p>
				</div>
			</div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'//导入轮播图组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'//导入数字选择框组件
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbotu:[],//轮播图数据
            goodsinfo:{},
            flag:false,//控制小球的显示隐藏
        }
    },
    created () {
      this.getLunBoTu();  
      this.getGoodsInfo();
    },
    methods: {
        getLunBoTu(){
            this.$http.get("api/getthumimages/"+this.id).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    // 循环轮播图数组的每一项  为item添加img属性  在轮播图组件中只读取img属性
                    res.body.message.forEach(item=>{
                        item.img = item.src;
                    })
                    this.lunbotu = res.body.message;
                }else{
                    Toast("获取轮播图数据失败")
                }
            })
        },
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.goodsinfo = res.body.message[0];
                }else{
                    Toast("获取商品信息失败")
                }
            })
        },
        goDesc(id){//点击跳转到图文介绍页面
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        goComment(id){//点击跳转至评论页面
            this.$router.push({name:"goodscomment",params:{id}})
        },
        addToShopCar(){//添加到购物车
            this.flag = !this.flag;
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            el.style.transform="translate(112px, 389px)";
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.flag = !this.flag;
        },
    },
    components: {//注册轮播图组件
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color: #e4393c;
            font-size: 16px;
            font-weight: bold;
        }   
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        } 
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top:387px;
            left: 148px;
        }    
    }
</style>