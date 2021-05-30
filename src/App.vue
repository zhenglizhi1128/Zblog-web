<template>
    <div id="app">
        <el-container>
            <el-header height="120px">
                <Header></Header>
            </el-header>

            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from "@/components/Header"

export default {
    name: 'App.vue',
    components: {Header}
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

