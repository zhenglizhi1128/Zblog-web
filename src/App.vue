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
import Header from '@/components/Header';

export default {
    name: 'App.vue',
    components: {Header}
};
</script>

<style>
#app {
    max-width: 960px;
    margin: 0 auto;
}
</style>

