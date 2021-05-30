<template>
	<div class="m-content">
		<div class="block">
			<div></div>
		</div>
		<div class="maction">
			<span><el-link href="/blogs">主页</el-link></span>
			<el-divider direction="vertical"></el-divider>

			<span><el-link type="success" @click="edit()">发表博客</el-link></span>
			<el-divider direction="vertical"></el-divider>
			<span v-show="!hasLogin">
				<el-button size="small" round @click="signup()">注册</el-button>
				<el-dialog
					title="注册"
					:visible.sync="signupFormVisible"
					center
					:append-to-body="true"
					:lock-scroll="false"
					width="20%"
				>
	<!--				<el-form :hide-required-asterisk="true" label-width="120px" :model="LoginRequest" :rules="rules"
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
							<el-button type="primary" @click="onSubmit">注册</el-button><br>
						</el-form-item>
					</el-form>-->
					<span>本网站使用邀请式注册，自行注册的方式暂不开放！</span>
					<p>
						<el-link style="left: 10px" @click="changeLog" :underline="false">已有账号，立即登陆</el-link>
					</p>
				</el-dialog>
				<el-divider direction="vertical"></el-divider>
				<el-button size="small" round @click="login()">登录</el-button>
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
							<el-button type="primary" @click="onSubmit">登陆</el-button><br>
						</el-form-item>
					</el-form>
					<p>
						<el-link style="left: 10px" @click="changeLog" :underline="false">立即注册</el-link>
						<el-link style="left: 210px" :underline="false">忘记密码</el-link>
					</p>
				</el-dialog>
				<el-divider direction="vertical"></el-divider>
			</span>
			<span v-show="hasLogin">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item icon="el-icon-edit" command="edit">写文章</el-dropdown-item>
						<el-dropdown-item icon="el-icon-house" command="home">我的主页</el-dropdown-item>
						<el-dropdown-item icon="el-icon-setting" command="set">设置</el-dropdown-item>
						<el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</span>
			<el-divider direction="vertical"></el-divider>
			<span><el-link href="/system">系统设置</el-link></span>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"))
			} else {
				callback()
			}
		}
		return {
			dialogFormVisible: false,
			signupFormVisible: false,
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
			this.$http
				.post("/api/auth/logout")
				.then((res) => {
					this.$store.commit("REMOVE_INFO")
					this.hasLogin = false
					this.$router.push({ path: "/blogs" })
				}).catch((res) => {
				this.$store.commit("REMOVE_INFO")
				this.hasLogin = false
			})
		},
		login() {
			this.dialogFormVisible = true
		},
		signup() {
			this.signupFormVisible = true
		},
		changeLog() {
			if (this.dialogFormVisible) {
				this.dialogFormVisible = false
				this.signupFormVisible = true
			} else {
				this.signupFormVisible = false
				this.dialogFormVisible = true
			}
		},
		handleCommand(command) {
			if (command === "logout") {
				this.logout()
			} else if (command === "edit") {
				this.edit()
			} else if (command === "set") {
				this.$router.push({ path: "/blog/add" })
			} else if (command === "home") {
				this.$router.push({ path: "/blog/add" })
			}

		},
		edit() {
			if (this.hasLogin) {
				this.$router.push({ path: "/blog/add" })
			} else {
				this.login()
			}
		},
		onSubmit() {
			this.$refs.LoginRequest.validate((valid) => {
				if (valid) {
					this.$http.post("/api/auth/login", this.LoginRequest).then((res) => {
						this.dialogFormVisible = false
						this.$store.commit("SET_TOKEN", res.data.tokenType + " " + res.data.token)
						this.$store.commit("SET_USERINFO", res.data)
						this.user.username = res.data.username
						this.hasLogin = true
						this.$router.push({ path: "/blogs" })
					})
				} else {
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