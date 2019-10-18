<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dataFormat}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <vue-preview :slides="slides"></vue-preview>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui' 
import comment from '../subcomponents/comment.vue'//引入评论子组件
export default {
    data() {
        return {
            id:this.$route.params.id,//获取路径上的ID
            photoinfo:{},//图片详情
            slides: [],
        }
    },
    created () {
        this.getPhotoInfo();
        this. getThumbs()
    },
    methods: {
      getPhotoInfo(){
          this.$http.get("api/getimageInfo/"+this.id).then((res)=>{            
              if(res.body.status===0&&res.body.message){
                  this.photoinfo = res.body.message[0];
              }else{
                  Toast("获取图片详情失败")
              }
          })
      },
      getThumbs(){
          this.$http.get("api/getthumimages/"+this.id).then((res)=>{
              if(res.body.status===0&&res.body.message){
                  //玄幻每个图片数据  补全图片的高和宽
                    res.body.message.forEach(item => {
                        
                        item.msrc=item.src;//小图标
                        item.w=600,
                        item.h=400
                    });
                    this.slides = res.body.message;
                  
              }else{
                  Toast("获取缩略图失败")
              }
          })
      },
    },
    components: {
        'cmt-box':comment//注册评论列表子组件
    }
}
</script>
<style lang="scss">
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
   .my-gallery{
        figure{
            display: inline-block;
            margin: 5px 10px;
           img{
                width: 100px;
                height: 100px;
                box-shadow: 0 0 8px #999;
           }
        }
    }
}
 
</style>