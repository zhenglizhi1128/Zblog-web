<template>
	<div>
		<div style="margin-top: 20px;">
			状态：
			<el-select v-model="status" @change="statusChange($event)" style="width: 150px" filterable placeholder="请选择">
				<el-option
					v-for="item in statusOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			角色：
			<el-select v-model="roleId" @change="roleChange($event)" filterable placeholder="请选择">
				<el-option
					v-for="item1 in roleOptions"
					:key="item1.id"
					:label="item1.name"
					:value="item1.id">
				</el-option>
			</el-select>
			<el-input placeholder="输入用户名或手机号" v-model="userNameOrPhone" class="input-with-select">
				<el-button slot="append" @click="page(1)" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<br>
		<div>
			<el-table
				:data="userTableData"
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
					prop="createTime"
					width="130px"
					label="注册时间">
					<template slot-scope="scope">
						{{ scope.row.createTime | dateformat("YYYY-MM-DD") }}
					</template>
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
					prop="ip"
					width="120px"
					label="IP地址">
				</el-table-column>
				<el-table-column
					align="center"
					prop="blogNum"
					width="70px"
					label="文章数">
				</el-table-column>
				<el-table-column
					align="center"
					prop="status"
					width="70px"
					label="状态">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="changeUserStatus(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					width="90px"
					prop="onlineStatus"
					:formatter="statusFormatter"
					label="在线状态">
				</el-table-column>
				<el-table-column
					align="center"
					label="操作"
					width="150px">
					<template slot-scope="scope">
						<el-button type="text" size="small">角色分配</el-button>
						<el-button type="text" size="small">删除</el-button>
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
	name: "UserSetting.vue",
	data() {
		return {
			value: true,
			currentPage: 1,
			total: 0,
			pageSize: 2,
			userTableData: [],
			statusOptions: [{value: null, label: "全部" }, { value: true, label: "可用" }, { value: false, label: "禁用" }],
			status: null,
			roleOptions: [],
			roleId:null,
			userNameOrPhone:""
		}
	},
	methods: {
		statusChange(value) {
			this.initialize(value,this.roleId,this.userNameOrPhone,this.currentPage, this.pageSize)
		},
		roleChange(value) {
			this.initialize(this.status,value,this.userNameOrPhone,this.currentPage, this.pageSize)
		},
		changeUserStatus(row){
		},
		page(currentPage){
			this.initialize(this.status,this.roleId,this.userNameOrPhone,currentPage, this.pageSize)
		},
		initialize(status, roleId, userNameOrPhone,currentPage, pageSize) {
			const params = {
				status: status,
				roleId: roleId,
				userNameOrPhone: userNameOrPhone,
				currentPage: currentPage,
				pageSize: pageSize
			}
			this.$http.get("/user/set/users", params).then((res) => {
				const data = res.data
				this.roleOptions = data.roles;
				this.userTableData = data.pageInfo.list;
				this.total = data.pageInfo.total;
			})
		},
		statusFormatter(row) {
			if (row.onlineStatus) {
				return "在线"
			} else {
				return "离线"
			}
		}
	},
	created() {
		this.initialize(this.status,this.roleId,this.userNameOrPhone,this.currentPage, this.pageSize)
	}
}
</script>
<style>
.input-with-select {
	background-color: #fff;
	width: 300px;
}

.page {
	margin: 0 auto;
	text-align: center;
}

</style>


