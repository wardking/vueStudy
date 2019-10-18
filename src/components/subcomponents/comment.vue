<template>
    <div class="cmt-container">
      <h3>发表评论</h3>  
      <hr>
      <textarea placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
      <div class="cmt-list">
          <div class="cmt-item" v-for="(item,index) in comments" :key="index">
              <div class="cmt-title">
                  第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间{{item.add_time | dataFormat}}
              </div>
              <div class="cmt-body">
                  {{item.content==="undefined"||!item.content?"用户评论过于敏感":item.content}}
              </div>
          </div>
      </div>
      <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data () {
        return {
            pageindex:1,//默认展示第一页数据
            comments:[],//所有的评论数据
            msg:"",//评论输入的内容
        }
    },
    created() {
        this.getCommemts();
    },
    methods: {
        getCommemts(){//获取评论
             this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.comments =this.comments.concat(res.body.message);//获取新的数据评论 不覆盖前面的数据  进行数组拼接
                }else{
                    Toast("获取评论失败")
                }
            })
        },
        getMore(){//加载更多
            this.pageindex++;//更改页码值 
            this.getCommemts();//从新请求
        },
        postComment(){//发表评论
            if(this.msg.trim().length === 0 ){
                return Toast("评论内容不能为空")
            }
            this.$http.post("api/postcomment/"+this.id,{
                content:this.msg.trim()//获取用户评论 并清除空格
                }).then((res)=>{
                if(res.body.status===0){
                    Toast(res.body.message)
                    // 1.拼接出评论对象
                    let cmt = {user_name:"你大爷",add_time:Date.now(),content:this.msg.trim()}
                    this.comments.unshift(cmt)
                    this.msg=""
                    
                }else{
                    Toast("发表评论失败")
                }
            })
        }
    },
    props: ["id"],//父子组件传参
}
</script>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin:5px 0;
            .cmt-item{
                font-size: 13px;
                
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2rem;
                }
            }
        }
    }
</style>