<template>
	<div class="m-content">
		<div class="block">
			<div></div>
		</div>
		<div class="maction">
			<span><el-link href="/blogs">主页</el-link></span>
			<el-divider direction="vertical"></el-divider>

			<span><el-link type="success" href="/blog/add">发表博客</el-link></span>

			<el-divider direction="vertical"></el-divider>
			<el-button v-show="!hasLogin" size="small" round @click="login()">登录</el-button>
			<el-dialog
				title="登录"
				:visible.sync="dialogFormVisible"
				center
				:append-to-body="true"
				:lock-scroll="false"
				width="20%"
			>
				<el-form :hide-required-asterisk="true" label-width="120px" :model="LoginRequest" :rules="rules"
						 ref="LoginRequest">
					<el-row>
						<el-col>
							<el-form-item label="账号" prop="usernameOrEmailOrPhone">
								<el-input v-model.number="LoginRequest.usernameOrEmailOrPhone"
										  placeholder="请输入账号"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="密码" prop="pass">
								<el-input type="password" v-model="LoginRequest.password"
										  placeholder="请输入密码"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="记住密码" prop="delivery">
								<el-switch v-model="LoginRequest.rememberMe"></el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item>
						<el-button type="primary" @click="onSubmit(LoginRequest)">立即创建</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<span v-show="hasLogin">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						{{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
					<el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
					<el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</span>
			<el-divider direction="vertical"></el-divider>
			<span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"))
			} else {
				callback()
			}
		}
		return {
			dialogFormVisible: false,
			user: {
				username: "请先登录"
			},
			hasLogin: false,
			LoginRequest: {
				usernameOrEmailOrPhone: "",
				password: "",
				rememberMe: false
			},
			rules: {
				usernameOrEmailOrPhone: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				],
				pass: [{ validator: validatePass, trigger: "blur" }]
			},
			formLabelWidth: "120px"
		}
	},
	methods: {
		logout() {
			console.log("--------")
			console.log(localStorage.getItem("token"))
			this.$http
				.post("/api/auth/logout")
				.then((res) => {
					this.$store.commit("REMOVE_INFO")
				})
			this.$store.commit("REMOVE_INFO")
		},
		login() {
			this.dialogFormVisible = true
		},
		onSubmit(LoginRequest) {
			this.$refs.LoginRequest.validate((valid) => {
				if (valid) {
					this.$http.post("/api/auth/login", this.LoginRequest).then((res) => {
						this.dialogFormVisible = false
						this.$store.commit("SET_TOKEN", res.data.tokenType + " " + res.data.token)
						this.$store.commit("SET_USERINFO", res.data)
						this.user.username = res.data.username
						this.hasLogin = true
					})
				} else {
					console.log("error submit!!")
					return false
				}
			})
		}
	},
	created() {
		if (this.$store.getters.getUser) {
			this.user.username = this.$store.getters.getUser.username
			this.hasLogin = true
		}
	}
}
</script>

<style scoped>
.m-content {
	max-width: 960px;
	margin: 0 auto;
	text-align: center;
}

.maction {
	margin: 10px 0;
}
</style>