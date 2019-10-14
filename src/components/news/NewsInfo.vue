<template>
    <div class="newsinfo-content">
        <!-- 大标题 -->
        <h3 class="title">{{newinfo.title}}</h3> 
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{newinfo.add_time | dataFormat}}</span>
            <span>点击:{{newinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newinfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import Toast from 'mint-ui'
import comment from '../subcomponents/comment.vue'//评论区域的子组件
export default {
    data() {
        return {
            id:this.$route.params.id,//获取url地址中的id值挂载到data上方便调用
            newinfo:{},
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){//获取新闻详情
            this.$http.get("api/getnew/"+this.id).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.newinfo = res.body.message[0];
                }else{
                    Toast("获取新闻详情失败")
                }
            })
        }
    },
    components: {//注册子组件的节点
        "comment-box":comment
    }
}
</script>
<style lang="scss" scoped>
    .newsinfo-content{
        padding: 0 4PX;
        .title{
            font-size: 16PX;
            text-align: center;
            margin: 15px 0;
            color: #e4393c;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{

        }
    }
</style>