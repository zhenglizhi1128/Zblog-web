<template>
	<div>
		<el-table
			:data="permissionTableData"
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
				prop="permissionId"
				show-overflow-tooltip
				label="ID">
			</el-table-column>
			<el-table-column
				align="center"
				prop="name"
				show-overflow-tooltip
				label="权限名">
			</el-table-column>
			<el-table-column
				align="center"
				prop="type"
				:formatter="formatter"
				label="权限类型">
			</el-table-column>
			<el-table-column
				align="center"
				prop="url"
				show-overflow-tooltip
				label="地址">
			</el-table-column>
			<el-table-column
				align="center"
				prop="permission"
				show-overflow-tooltip
				label="权限表达式">
			</el-table-column>
			<el-table-column
				align="center"
				prop="method"
				width="150px"
				label="后端接口访问方式">
			</el-table-column>
			<el-table-column
				align="center"
				prop="sort"
				label="排序">
			</el-table-column>
			<el-table-column
				align="center"
				prop="parentId"
				label="父级ID">
			</el-table-column>
			<el-table-column
				align="center"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small">编辑</el-button>
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
			permissionTableData: [{
				permissionId: "112121212121",
				name: "dddddd",
				type: "1",
				url: "/**/api/monitor/online/user/kickout",
				permission: "/user/kickout",
				method: "get",
				sort: "22",
				parentId: "22"
			}]
		}
	},
	methods: {
		formatter(row) {
			if (row.type === 1) {
				return "页面"
			} else {
				return "按钮"
			}
		},
	},
	created() {
		console.log("permission")
	}

}
</script>

<style scoped>

</style>