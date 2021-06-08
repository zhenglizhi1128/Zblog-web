<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<el-tabs v-model="activeName" @tab-click="changeTab">
			<el-tab-pane label="用户管理" name="userSet">
				<div>
					<div style="margin-top: 20px;">
						状态：
						<el-select v-model="value" filterable placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						在线状态：
						<el-select v-model="value" filterable placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						角色：
						<el-select v-model="value" filterable placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-input placeholder="输入用户名或手机号" v-model="name" class="input-with-select">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</div>
					<br>
					<div>
						<el-table
							:data="tableData"
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
										{{ scope.row.userName }}
									</el-link>
								</template>
							</el-table-column>
							<el-table-column
								align="center"
								prop="name"
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
								prop="date"
								width="130px"
								label="注册时间">
								<template slot-scope="scope">
									{{ scope.row.date1 | dateformat("YYYY-MM-DD") }}
								</template>
							</el-table-column>
							<el-table-column
								align="center"
								prop="date1"
								show-overflow-tooltip
								label="最近登陆时间">
								<template slot-scope="scope">
									{{ scope.row.date1 | dateformat("YYYY-MM-DD HH:mm:ss") }}
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
								prop="num"
								width="70px"
								label="文章数">
							</el-table-column>
							<el-table-column
								align="center"
								prop="sta"
								width="70px"
								label="状态">
								<template slot-scope="scope">
									<el-switch
										v-model="scope.row.sta"
										:active-value="1"
										:inactive-value="2"
										active-color="#13ce66"
										inactive-color="#ff4949"
										@change="changeSwitch(scope.row)">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column
								align="center"
								width="90px"
								prop="online"
								label="在线状态">
								<template slot-scope="scope">
									<el-switch
										v-model="scope.row.online"
										:active-value="1"
										:inactive-value="2"
										active-color="#13ce66"
										inactive-color="#ff4949"
										@change="changeSwitch(scope.row)">
									</el-switch>
								</template>
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
						<!--						<el-pagination
													class="page"
													background
													:hide-on-single-page="value"
													layout="prev, pager, next"
													:current-page="currentPage"
													:page-size="pageSize"
													:total="total"
													@current-change="page"
												>
												</el-pagination>-->
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="角色管理" name="roleSet">
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
			</el-tab-pane>
			<el-tab-pane label="权限管理" name="permissionSet">
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
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	name: "UserSetting.vue",
	data() {
		return {
			name: "",
			activeName: "userSet",
			currentPage: 1,
			total: 0,
			pageSize: 5,
			tableData: [{
				date: "2016-05-02",
				date1: "2016-05-02 22:22:22",
				userName: "王小虎啊",
				name: "王小虎",
				phone: "15544446666",
				ip: "162.168.0.1",
				num: "155",
				sta: 1,
				online: "1",
				address: "上海市普陀区金沙江路 1518 弄"
			}],
			options: [{
				value: "选项1",
				label: "黄金糕"
			}, {
				value: "选项2",
				label: "双皮奶"
			}, {
				value: "选项3",
				label: "蚵仔煎"
			}, {
				value: "选项4",
				label: "龙须面"
			}, {
				value: "选项5",
				label: "北京烤鸭"
			}],
			value: "",
			roleTableData: [{
				date: "2016-05-02",
				date1: "2016-05-02 22:22:22",
				userName: "王小虎啊",
				name: "王小虎"
			}],
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
		changeSwitch(row) {
			console.log(row.phone)
		},
		changeTab(tab, event) {
			console.log(tab, event)
		},
		formatter(row, column) {
			if (row.type === 1) {
				return "页面"
			} else {
				return "按钮"
			}
		}

	},
	created() {

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


