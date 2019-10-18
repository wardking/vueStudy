<template>
    <div>
        <!-- 谁使用这个组件谁传list数据   应该是父组件向子组件传值来设置 -->
       <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in slideshowList" :key="index">
                <img :src="item.img" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 为什么商品评论中的轮播图那么丑 -->
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:["slideshowList","isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe{//mint-ui自带的class类
        height: 13rem;
        .mint-swipe-item{
            text-align: center;
            img{
                // width: 100%;
                height: 100%;
            }
            .full{
                width: 100%;
            }   
        }
    }
</style>