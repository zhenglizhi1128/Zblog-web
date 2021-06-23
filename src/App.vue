<template>
    <div id="app">
        <el-container>
            <el-header height="120px">
                <Header></Header>
            </el-header>

            <el-main>
                <router-view v-if="isRouterAlive"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from "@/components/Header"

export default {
    name: 'App.vue',
    components: {Header},
	provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
		return {
			reload: this.reload
		}
	},
	data() {
		return{
			isRouterAlive: true                    //控制视图是否显示的变量
		}
	},
	methods: {
		reload () {
			this.isRouterAlive = false;            //先关闭，
			this.$nextTick(function () {
				this.isRouterAlive = true;         //再打开
			})
		}
	}
};
</script>

<style>
#app {
	position: absolute;
	top: 10%;
	left: 10%;
	width: 80%;
	height: 100%;
	margin: 0 auto;
}
</style>

