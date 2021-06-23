<template>
	<div>
		<el-table
		:data="onlineUserData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
		border
		highlight-current-row
		style="width: 100%">
		<template slot="empty">
			<div>暂无数据</div>
		</template>
		<el-table-column
			fixed
			align="center"
			prop="userName"
			width="100px"
			show-overflow-tooltip
			label="用户名">
			<template slot-scope="scope">
				<el-link :underline="false" type="primary">
					{{ scope.row.username }}
				</el-link>
			</template>
		</el-table-column>
		<el-table-column
			align="center"
			prop="nickname"
			width="100px"
			show-overflow-tooltip
			label="姓名">
		</el-table-column>
		<el-table-column
			align="center"
			prop="phone"
			width="150px"
			label="手机号">
		</el-table-column>
		<el-table-column
			align="center"
			prop="lastTime"
			show-overflow-tooltip
			label="最近登陆时间">
			<template slot-scope="scope">
				{{ scope.row.lastTime | dateformat("YYYY-MM-DD HH:mm:ss") }}
			</template>
		</el-table-column>
		<el-table-column
			align="center"
			label="操作"
			width="150px">
			<template slot-scope="scope">
				<el-button type="text" @click="logout(scope.row.username)" size="small">强制退出</el-button>
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
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: "OnlineUserSetting",
	inject:['reload'],
	data() {
		return {
			onlineUserData:[],
			value: true,
			currentPage: 1,
			total:10,
			pageSize: 10
		}
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.currentPage = val;
		},
		initialize() {
			this.$http.get("/user/set/onlineUser").then((res) => {
				this.onlineUserData= res.data;
				this.total=res.data.length;
			})
		},
		logout(username){
			this.$http.delete("/user/set/logout", {username:username}).then((res) => {
				this.$message({
					message: '踢出成功',
					type: 'success'
				});
				this.reload();
			})
		},
	},
	created() {
		this.initialize();
	}
}
</script>

<style scoped>

</style>