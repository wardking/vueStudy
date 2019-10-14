<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3>{{item.title}}</h3>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.add_time|dataFormat}}</span>
                                <span>点击:{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>			
			</ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            newslist:[],
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){//获取新闻列表
            this.$http.get("api/getnewslist").then((res)=>{
                console.log(res.body)
                if(res.body.status===0&&res.body.message){
                    this.newslist=res.body.message
                }else{
                    Toast("获取新闻列表数据失败")
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h3{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between
            }
        }
    }
</style>