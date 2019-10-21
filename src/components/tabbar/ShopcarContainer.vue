<template>
    <div class="goods-list">
        <!-- 商品列表项 -->
       <div class="mui-card" v-for="(item,index) in goodslist" :key="index">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                            <!-- 如何从购物车中获取商品的数量 -->
                            <!-- 1.可以先创建空对象，然后循环购物车中所有商品的数据，把当前循环的这条商品的ID，作为对象的属性名，count值作为对象的属性值，当把所有的商品循环一遍，就会得到一个对象-->
                            <!-- 2. -->
                            <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                        </p>
                    </div>
				</div>
			</div>
		</div>
        <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>(总计不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价：<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue"
export default {
    data() {
        return {
            goodslist:[],//购物车中所有的商品数据
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){//获取购物车商品列表
            //获取store中所有的商品id  拼接出一个用逗号分隔的字符串
            let idArr=[];
            this.$store.state.car.forEach(item=>idArr.push(item.id))
            // 如果购物车中没有商品直接return
            if(idArr.length<=0) return;
            this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(res=>{
                if(res.body.status===0&&res.body.message){
                    this.goodslist = res.body.message;
                }else{
                    alert("请求商品数据失败")
                }
            })

        },
        remove(id,index){//点击删除
        // 点击删除 把商品信息从store中删除 根据传递来的id
        // 将goodsinfo中的数据删除  根据传过来的goodsinfo的index下标
        this.goodslist.splice(index,1);
        this.$store.commit("removeFormCar",id)

        },
        selectedChanged(id,value){
            // 每当点击开关 把开关的最新状态同步到store中
            this.$store.commit("updateGoodsSelected",{id:id,selected:value})
        }
    },
    components:{
        numbox,
    }
}
</script>
<style lang="scss" scoped>
    .goods-list{
        background-color: #eee;
        overflow: hidden;
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: #e4393c;
                font-weight: bold;
            }
        }
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: #e4393c;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>