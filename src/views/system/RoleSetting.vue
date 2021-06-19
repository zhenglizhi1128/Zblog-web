<template>
	<div>
		<el-table
			:data="roleTableData"
			border
			highlight-current-row
			style="width: 100%">
			<template slot="empty">
				<div>暂无数据</div>
			</template>
			<el-table-column
				align="center"
				width="50"
				type="index">
			</el-table-column>
			<el-table-column
				align="center"
				prop="userName"
				label="角色名">
			</el-table-column>
			<el-table-column
				align="center"
				prop="name"
				label="描述">
			</el-table-column>
			<el-table-column
				align="center"
				prop="date"
				label="注册时间">
				<template slot-scope="scope">
					{{ scope.row.date1 | dateformat("YYYY-MM-DD") }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="date1"
				label="修改时间">
				<template slot-scope="scope">
					{{ scope.row.date1 | dateformat("YYYY-MM-DD HH:mm:ss") }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small">权限分配</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "RoleSetting",
	data() {
		return {
			roleTableData: [{
				date: "2016-05-02",
				date1: "2016-05-02 22:22:22",
				userName: "王小虎啊",
				name: "王小虎"
			}]
		}
	},
	methods: {

	},
	created() {
		console.log("UI农村")
	}

}
</script>

<style scoped>

</style>