<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<el-tabs v-model="activeName" @tab-click="changeTab">
			<el-tab-pane label="用户基础设置" name="first" :key="'first'">
				<child1  v-if="userSetFlag"></child1>
			</el-tab-pane>
			<el-tab-pane label="在线用户统计" name="second" :key="'second'">
				<child2 v-if="onlineUserSetFlag"></child2>
			</el-tab-pane>
			<el-tab-pane label="权限设置" name="three" :key="'three'">
				<child3 v-if="roleSetFlag"></child3>
			</el-tab-pane>
			<el-tab-pane label="在线用户统计" name="four" :key="'four'">
				<child4 v-if="permissionSetFlag"></child4>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import onlineUserSet from "./OnlineUserSetting"
import userSet from "./UserSetting"
import roleSet from "./RoleSetting"
import permissionSet from "./PermissionSetting"

export default {
	name: "UserHomeSetting.vue",
	components: {
		child1: userSet,
		child2: onlineUserSet,
		child3: roleSet,
		child4: permissionSet
	},
	data() {
		return {
			activeName: "first",
			userSetFlag: true,
			onlineUserSetFlag: false,
			roleSetFlag: false,
			permissionSetFlag: false
		}
	},
	methods: {
		changeTab(tab) {
			if (tab.name === 'first') {
				this.userSetFlag = true
				this.onlineUserSetFlag = false
				this.roleSetFlag = false
				this.permissionSetFlag = false
			} else if (tab.name === 'second') {
				this.userSetFlag = false
				this.onlineUserSetFlag = true
				this.roleSetFlag = false
				this.permissionSetFlag = false
			} else if (tab.name === 'three') {
				this.userSetFlag = false
				this.onlineUserSetFlag = false
				this.roleSetFlag = true
				this.permissionSetFlag = false
			} else if (tab.name === 'four') {
				this.userSetFlag = false
				this.onlineUserSetFlag = false
				this.roleSetFlag = false
				this.permissionSetFlag = true
			}
		},
	},
	created() {}
}
</script>
<style>


</style>


