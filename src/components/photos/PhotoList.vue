<template>
    <div>
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="(item,index) in cates" :key="index" 
                    @click="getPhotoListByCateId(item.id)">
							{{item.title}}
					</a>
				</div>
			</div>
		</div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="(item,index) in list" :key="index" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'//导入mui.js  实现滚动
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            cates:[],//所有的分类的数组
            list:[],//图片列表的数组
        }
    },
    created () {
        this.getAllCategory();
        this.getPhotoListByCateId();
    },
    mounted(){//放在生命周期中  待dom加载完成以后  此方法才会有效
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    },
    methods: {
        getAllCategory(){//获取所有的图片分类
            this.$http.get("api/getimgcategory").then((res)=>{
                if(res.body.status===0&&res.body.message){
                    // 手动拼接最完整的列表
                    res.body.message.unshift({title:"全部",id:0})
                    this.cates = res.body.message
                }else{
                    Toast("获取图片分类失败")
                }
            })
        },
        getPhotoListByCateId(cateId=0){//根据分类ID获取图片列表
            this.$http.get("api/getimages/" + cateId).then((res)=>{
                if(res.body.status===0&&res.body.message){
                    this.list = res.body.message;
                }else{
                    Toast("获取图片列表失败")
                }
            })
        }

    },
}
</script>
<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.photo-list{
    list-style: none;
    padding: 0;
    margin:10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
        .info{
             color: #fff;
             text-align: left;
             position: absolute;
             bottom: 0px;
             background-color:rgba(0,0,0,0.4); 
             max-height: 90px;
             padding: 3px 5px;
             overflow: hidden;
            .info-title{
               font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}

</style>