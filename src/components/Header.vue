<template>
  <div class="m-content">
    <h3>欢迎来到我的博客</h3>
    <div class="block">
      <div>{{ user.username }}</div>
    </div>
    <div class="maction">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>

      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>

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
        <el-form :hide-required-asterisk="true"  label-width="120px" :model="LoginRequest" :rules="rules" ref="LoginRequest">
          <el-row>
            <el-col>
              <el-form-item label="账号" prop="usernameOrEmailOrPhone">
                <el-input  v-model.number="LoginRequest.usernameOrEmailOrPhone" placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="LoginRequest.password" placeholder="请输入密码"></el-input>
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
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      user: {
          username: '请先登录',
        },
      hasLogin: false,
      LoginRequest: {
        usernameOrEmailOrPhone: '',
        password: '',
        rememberMe: false,
      },
      rules: {
        usernameOrEmailOrPhone: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }],
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    logout() {
      this.$axios
        .get('/logout', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.$store.commit('REMOVE_INFO');
          this.$router.push('/login');
        });
    },
    login() {
      this.dialogFormVisible = true;
    },
    onSubmit(LoginRequest) {
       this.$refs.LoginRequest.validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.LoginRequest).then(res => {
            if (res.data.code  === 200 ){
              dialogFormVisible = false;
              $store.commit("SET_TOKEN", res.data.data.tokenType+" "+res.data.data.token)
              $store.commit("SET_USERINFO", res.data.data)
              $router.push("/blogs")
            }else{
              $message.error("你的用户名或者密码错误!")
              return false;
            }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      }); 
    },
  },
  created() {
    if(this.$store.getters.getUser) {
        this.user.username = this.$store.getters.getUser.username
        this.hasLogin = true
      }
  },
};
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