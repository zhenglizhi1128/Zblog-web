<template>
	<div id="id_set">
		<el-container>
			<el-aside width="200px">
				<el-menu
					:default-active="activeMenu"
					:router="true">
					<el-menu-item index="/centralControl">
						<template slot="title">
							<i class="el-icon-odometer"></i>
							中控台
						</template>
					</el-menu-item>
					<el-menu-item index="/announcements">
						<template slot="title">
							<i class="el-icon-postcard"></i>
							公告列表
						</template>
					</el-menu-item>
					<el-menu-item index="/blogSetting">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							文章管理
						</template>
					</el-menu-item>
					<el-menu-item index="/commentSetting">
						<template slot="title">
							<i class="el-icon-chat-dot-round"></i>
							评论管理
						</template>
					</el-menu-item>
					<el-menu-item index="/labelSetting">
						<template slot="title">
							<i class="el-icon-collection-tag"></i>
							标签管理
						</template>
					</el-menu-item>
					<el-menu-item index="/announcementSetting">
						<template slot="title">
							<i class="el-icon-bell"></i>
							公告设置
						</template>
					</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-user"></i>用户管理</template>
						<el-menu-item index="/userSetting">用户设置</el-menu-item>
						<el-menu-item index="/onlineUserSet">在线用户设置</el-menu-item>
						<el-menu-item index="/roleSet">角色设置</el-menu-item>
						<el-menu-item index="/permissionSet">权限设置</el-menu-item>
					</el-submenu>
					<el-menu-item index="/siteSetting">
						<template slot="title">
							<i class="el-icon-setting"></i>
							网站设置
						</template>
					</el-menu-item>
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
	computed: {
		activeMenu() {
			const route = this.$route
			const { meta, path } = route
			if (meta.activeMenu) {
				console.log(meta.activeMenu)
				return meta.activeMenu
			}
			return path
		}
	},
    data() {
        return {
		}
    },
    methods: {}
}
</script>
<style>
a {
	text-decoration: none;
}

#id_set {
	position: absolute;
	left: 5%;
	width: 90%;
	margin: 0 auto;
}
</style>
<!--				<el-menu
					:default-active="this.$route.path"
					class="el-menu-vertical-demo"
					>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-operation"></i>
							<span>系统管理</span>
						</template>
						<router-link :to="{ name: 'CentralControl' }">
							<el-menu-item index="1-1">
                                <template slot="title">
                                    <i class="el-icon-odometer"></i>
									中控台
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

                        <router-link :to="{ name: 'UserHomeSetting' }">
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
                </el-menu>-->
