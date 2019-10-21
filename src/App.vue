<template>
    <div class="app-container">
        <!-- 顶部Header区域 -->
        <mt-header fixed title="Vue项目">
			<p slot="left" @click="getGo()" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</p>
		</mt-header>
        <!-- 路由切换区域 -->
		<!-- 添加路由动画 -->
		<transition>
			<router-view></router-view>
		</transition>
		
        <!-- 底部Tabbart区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>		
    </div>
</template>

<script>
export default {
   data() {
	   return {
		   flag:false,
	   }
   },
   created() {
	   this.flag = this.$route.path==="/home"?false:true;
   },
   methods: {
	   getGo(){
		   this.$router.go(-1)
	   }
   },
   watch: {
	   "$route.path":function(newVal){//这里要是用ES6会报错
		   if(newVal==="/home"){
			   this.flag=false;
		   }else{
			   this.flag=true
		   }
	   }
   },
}
</script>
<style lang="scss" scope>
.mint-header.is-fixed{
	z-index: 99999;
}
    .app-container{
        padding-top:40px; 
		padding-bottom: 50px;
		overflow-x: hidden;//路由动画样式
		.mint-header .mint-button{
			color: #fff;
			line-height:50px;
		}
    }
	// 设置路由动画
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,.v-leave-active{
		transition: all .5s ease;
	}
	// 改类名 解决底部导航无法点击的问题
	.mui-bar-tab .mui-tab-item-llb.mui-active {
   		color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-llb {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>