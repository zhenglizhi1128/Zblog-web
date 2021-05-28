<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-operation"></i>
                            <span>系统管理</span>
                        </template>
                        <router-link :to="{ name: 'CentralControl' }">
                            <el-menu-item index="1-1">
                                <template slot="title">
                                    <i class="el-icon-odometer"></i>
                                    仪表盘
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'Announcements' }">
                            <el-menu-item index="1-2">
                                <template slot="title">
                                    <i class="el-icon-postcard"></i>
                                    公告列表
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'BlogSetting' }">
                            <el-menu-item index="1-3">
                                <template slot="title">
                                    <i class="el-icon-notebook-1"></i>
                                    文章管理
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'CommentSetting' }">
                            <el-menu-item index="1-4">
                                <template slot="title">
                                    <i class="el-icon-chat-dot-round"></i>
                                    评论管理
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'LabelSetting' }">
                            <el-menu-item index="1-5">
                                <template slot="title">
                                    <i class="el-icon-collection-tag"></i>
                                    标签管理
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'AnnouncementSetting' }">
                            <el-menu-item index="1-6">
                                <template slot="title">
                                    <i class="el-icon-bell"></i>
                                    公告设置
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'UserSetting' }">
                            <el-menu-item index="1-7">
                                <template slot="title">
                                    <i class="el-icon-user"></i>
                                    用户管理
                                </template>
                            </el-menu-item>
                        </router-link>

                        <router-link :to="{ name: 'SiteSetting' }">
                            <el-menu-item index="1-8">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    网站设置
                                </template>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    name: "System.vue",
    data() {
        return {}
    },
    methods: {}
}
</script>
<style>
a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: none;
}
</style>
