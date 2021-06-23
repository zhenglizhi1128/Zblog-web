<template>
	<div>
		<div style="margin-top: 20px;">
			状态：
			<el-select v-model="status" clearable @change="statusChange($event)" style="width: 150px" filterable placeholder="请选择">
				<el-option
					v-for="item in statusOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			角色：
			<el-select v-model="roleId" clearable @change="roleChange($event)" filterable placeholder="请选择">
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
			<span style="float:right"><el-button @click="signup()">新增用户</el-button>
				<el-dialog
					title="新增用户"
					:visible.sync="signupFormVisible"
					center
					:append-to-body="true"
					:lock-scroll="false"
					width="20%"
				>
				<el-form :hide-required-asterisk="true" label-width="120px" :model="user" :rules="rules"
				ref="user">
						<el-row>
							<el-col>
								<el-form-item label="账号" prop="username">
									<el-input v-model.number="user.username"
											  placeholder="请输入账号"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col>
								<el-form-item label="密码" prop="pass">
									<el-input type="password" v-model="user.password"
											  placeholder="请输入密码"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">确定</el-button><br>
						</el-form-item>
					</el-form>
				</el-dialog>
			</span>
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
						<el-button type="text" @click="deleteUser(scope.row.id)" size="small">删除</el-button>
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
	inject:['reload'],
	data() {
		const validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"))
				} else {
					callback()
				}
			}
		return {
			value: true,
			currentPage: 1,
			total: 0,
			pageSize: 10,
			userTableData: [],
			statusOptions: [{ value: true, label: "可用" }, { value: false, label: "禁用" }],
			status: null,
			roleOptions: [],
			roleId:null,
			userNameOrPhone:"",
			signupFormVisible:false,
			user: {
				username: "",
				password: "",
			},
			rules: {
				username: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				],
				pass: [{ validator: validatePass, trigger: "blur" }]
			},
		}
	},
	methods: {
		signup() {
			this.signupFormVisible = true
		},
		onSubmit() {
			this.$refs.user.validate((valid) => {
				if (valid) {
					this.$http.post("/api/auth/sign-up", this.user).then((res) => {
						this.signupFormVisible = false;
						this.reload();
					})
				} else {
					return false
				}
			})
		},
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
		},
		deleteUser(userId){
			this.$http.delete("/user/set/delete",{userId:userId}).then((res) => {
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.reload();
			})
		},
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


