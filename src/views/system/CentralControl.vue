<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
		</el-breadcrumb>
		<br>
		<el-row :gutter="24">
			<el-col :span="24">
				<el-card shadow="always">
					<span>文章总数</span><span style="float: right; padding: 3px 0">x</span>
				</el-card>
			</el-col>
		</el-row>
		<br>
		<el-row :gutter="24">
			<el-col :span="12">
				<el-card shadow="always">
					<span>用户数量</span><span style="float: right; padding: 3px 0">x</span>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="always">
					<span>留言板数量</span><span style="float: right; padding: 3px 0">x</span>
				</el-card>
			</el-col>
		</el-row>
		<br>
		<el-collapse>
			<el-collapse-item title="最新文章" name="1">
				<div>
					<el-link type="info">信息链接</el-link>
				</div>
				<el-divider></el-divider>
			</el-collapse-item>
			<el-collapse-item title="最新留言" name="4">
				<el-button type="text" @click="open">点击打开 Message Box</el-button>
				<el-divider></el-divider>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
export default {
	name: "CentralControl.vue",
	data() {
		return {}
	},
	methods: {
		open() {
			this.$alert("这是一段内容", "标题名称", {
				confirmButtonText: "确定",
				callback: action => {
					this.$message({
						type: "info",
						message: `action: ${action}`
					})
				}
			})
		}
	},
	created() {

	}
}
</script>


