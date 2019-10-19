<template>
<!-- 因为异步处理的关系 max可能无法获取到值 -->
<!-- 解决办法：可以使用watch属性来监听父组件传过来的max值 不管watch会不会被处罚，最后一次肯定是一个合法的max值-->
   <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){//input值发生改变时触发
            // console.log(this.$refs.numbox.value)
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch: {//通过属性监听判断max的值是否是合法值
        'max':(newVal,oldVal)=>{
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>