<template>
	<div class="mcontaner">
		<div class="block">
			<el-timeline>
				<el-timeline-item
					:timestamp="blog.createTime | dateformat('YYYY-MM-DD')"
					placement="top"
					v-for="(blog,index) in blogs"
					:key="index"
				>
					<el-card>
						<el-link :underline="false" @click="detail(blog.id)">
							<h2>{{ blog.title }}</h2>
						</el-link>
						<p>
							<el-link :underline="false" @click="detail(blog.id)">
								{{ blog.description }}
							</el-link>
						</p>
						<p>{{ blog.createTime | dateformat("YYYY-MM-DD HH:mm:ss") }}</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-pagination
				class="page"
				background
				:hide-on-single-page="value"
				layout="total,prev, pager, next"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="total"
				@current-change="page"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: "Blogs.vue",
	data() {
		return {
			reverse: true,
			value: true,
			blogs: [],
			currentPage: 1,
			total: 0,
			pageSize: 5
		}
	},
	methods: {
		page(currentPage) {
			this.$http
				.get("/blog/blogs", {
						currentPage: currentPage,
						pageSize: this.pageSize
					}
				)
				.then((res) => {
					this.blogs = res.data.list
					this.currentPage = res.data.pageNum
					this.total = res.data.total
					this.pageSize = res.data.pageSize
				})
		},
		detail(blogId) {
			const new1 = this.$router.resolve({ name: "BlogDetail", params: { blogId: blogId } })
			window.open(new1.href, "_blank")
		}
	},
	created() {
		this.page(1)
	}
}
</script>

<style scoped>
.page {
	margin: 0 auto;
	text-align: center;
}
</style>
