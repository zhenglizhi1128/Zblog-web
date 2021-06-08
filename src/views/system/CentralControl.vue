<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
		</el-breadcrumb>
		<br>
		<el-row :gutter="24">
			<el-col :span="24">
				<el-card shadow="always">
					<span>文章总数</span><span style="float: right; padding: 3px 0">{{ blogNum }}</span>
				</el-card>
			</el-col>
		</el-row>
		<br>
		<el-row :gutter="24">
			<el-col :span="12">
				<el-card shadow="always">
					<span>用户数量</span><span style="float: right; padding: 3px 0">{{ userNum }}</span>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="always">
					<span>留言板数量</span><span style="float: right; padding: 3px 0">{{ messageNum }}</span>
				</el-card>
			</el-col>
		</el-row>
		<br>
		<el-collapse>
			<el-collapse-item name="1">
				<template slot="title">
					<div style="width: 100%;">
						<h3 style="text-align:center">
							最新文章
						</h3>
					</div>
				</template>
				<div v-for="(blog,index) in blogs" :key="index">
					<el-card>
						<el-link :underline="false">
							<h4>{{ blog.title }}</h4>
						</el-link>
						<el-link :underline="false">
							<p>{{ blog.description }}</p>
						</el-link>
					</el-card>
				</div>
			</el-collapse-item>
			<el-collapse-item name="2">
				<template slot="title">
					<div style="width: 100%;">
						<h3 style="text-align:center">
							最新留言
						</h3>
					</div>
				</template>
				<el-button type="text" @click="open">点击打开 Message Box</el-button>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
export default {
	name: "CentralControl.vue",
	data() {
		return {
			blogNum: "",
			userNum: "",
			messageNum: 0,
			blogs: []

		}
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
		},
		initialize() {
			this.$http
				.get("/central/initialize")
				.then((res) => {
					this.blogNum = res.data.blogNum
					this.userNum = res.data.userNum
					/*this.messageNum=res.data.messageNum;*/
					this.blogs = res.data.blogs
				})
		}

	},
	created() {
		this.initialize()
	}
}
</script>


