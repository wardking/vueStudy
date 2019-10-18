<template>
    <div>
        <!-- 轮播区域 -->
        <swiper :slideshowList="slideshowList" :isfull="true"></swiper>
        <!-- 9宫格布局 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img src="../../images/icon1.png" alt="新闻资讯">
		                    <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
		                   <img src="../../images/icon2.png" alt="图片分享">
		                    <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
		                     <img src="../../images/icon3.png" alt="商品购买">
		                    <div class="mui-media-body">商品购买</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/icon4.png" alt="留言反馈">
		                    <div class="mui-media-body">留言反馈</div>
                        </a>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/icon5.png" alt="视频专区">
		                    <div class="mui-media-body">视频专区</div>
                        </a>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/icon6.png" alt="联系我们">
		                    <div class="mui-media-body">联系我们</div>
                        </a>
                    </li>
		        </ul> 
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from "../subcomponents/swiper.vue"//导入轮播图组件
export default {
    data() {
        return {
            slideshowList:[],//保存轮播图的数组
        }
    },
    created () {
        this.getSlideshow();
    },
    methods: {
        getSlideshow(){//获取轮播图数据
            this.$http.get("api/getlunbo").then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.slideshowList=res.body.message;
                }else{
                    Toast("获取轮播图失败")
                }
            })
        }
    },
    components: {
        swiper
    }
}
</script>
<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border:none;
        img{
            width: 3rem;
            height: 3rem;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:none;
    }
</style>