<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>文章管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<div style="width: 100%;">
			<span style="margin-top: 20px">
				状态:
				<el-radio-group @change="stateChange" v-model="status" size="medium">
					<el-radio-button label="null">全部</el-radio-button>
					<el-radio-button label="1">启用</el-radio-button>
					<el-radio-button label="0">禁用</el-radio-button>
				</el-radio-group>
			</span>
			<span>
        		标签：
				<el-select v-model="labelId" filterable placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</span>
			&nbsp;&nbsp;&nbsp;
			<span>
				<el-input placeholder="输入文章标题" v-model="title" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</span>
		</div>
		<br>
		<div>
			<el-table :data="tableData" stripe style="width: 100%">
				<template slot="empty">
					<div>暂无数据</div>
				</template>
				<el-table-column show-overflow-tooltip label="标题" align="center" width="150">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<span style="margin-left: 10px">{{ scope.row.title }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="作者" align="center" width="100">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<span style="margin-left: 10px">{{ scope.row.user.username }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="发布时间" align="center" width="150">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">
                        {{ scope.row.createTime | dateformat("YYYY-MM-DD") }}
                    </span>
					</template>
				</el-table-column>
				<el-table-column label="修改日期" align="center" width="150">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">
                        {{ scope.row.updateTime | dateformat("YYYY-MM-DD") }}
                    </span>
					</template>
				</el-table-column>
				<el-table-column label="浏览量" align="center" width="100">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<span style="margin-left: 10px">{{ scope.row.readNumber }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" width="100">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							:active-value="1"
							:inactive-value="0"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="changeStatus(scope.row.id,scope.row.status)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="评论状态" align="center" width="100">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.commentStatus"
							:active-value="1"
							:inactive-value="0"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="changeCommentStatus(scope.row.id,scope.row.commentStatus)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button
							size="mini"
							icon="el-icon-edit"
							@click="modifyBlog(scope.row.id, scope.row.name)"
						>编辑
						</el-button>
						<el-button
							size="mini"
							type="danger"
							icon="el-icon-delete"
							@click="deleteBlog(scope.row.id)"
						>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div>
				<br>
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
	</div>
</template>

<script>
export default {
	name: "BlogSetting.vue",
	data() {
		return {
			status: null,
			title: "",
			options: [],
			labelId: null,
			tableData: [],
			value: true,
			currentPage: 1,
			total: 0,
			pageSize: 1
		}
	},
	methods: {
		stateChange(blogId, status) {
			this.$http.put("/blog/set/updateStatus",
				{ "blogId": blogId, "status": status }).then((res) => {
			})
		},
		deleteBlog(id) {
			this.$http.delete("/blog/set/blog", id).then((res) => {
				this.$message({
					message: "恭喜你，删除成功",
					type: "success"
				})
			})
		},
		modifyBlog(id, name) {

		},
		changeCommentStatus(blogId, commentStatus) {
			this.$http.put("/blog/set/updateCommentStatus",
				{ "blogId": blogId, "commentstatus": commentStatus }).then((res) => {
			})
		},
		changeStatus(blogId, status) {
			this.$http.put("/blog/set/updateStatus",
				{ "blogId": blogId, "status": status }).then((res) => {
			})
		},
		initialize(labelId, status, title, currentPage, pageSize) {
			const params = {
				labelId: labelId,
				status: status,
				title: title,
				currentPage: currentPage,
				pageSize: pageSize
			}
			this.$http.get("/blog/set/blogs", params).then((res) => {
				const data = res.data
				this.options = data.labels
				this.tableData = data.pageInfo.list
				this.total = data.pageInfo.total
			})
		},
		page(currentPage) {
			this.initialize(this.labelId, this.status, this.title, currentPage, this.pageSize)
		}
	},
	created() {
		this.initialize(this.labelId, this.status, this.title, this.currentPage, this.pageSize)
	}
}
</script>
<style>
.input-with-select {
	background-color: #fff;
	width: 300px;
}
</style>


