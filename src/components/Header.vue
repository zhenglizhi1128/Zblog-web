<template>
  <div class="m-content">
    <h3>欢迎来到我的博客</h3>
    <div class="maction">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>

      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <!-- <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span> -->
      <el-button size="small" round @click="login()">登录</el-button>
      <el-dialog
        title="登录"
        :visible.sync="dialogFormVisible"
        center
        :append-to-body="true"
        :lock-scroll="false"
        width="40%"
      >
       <el-form label-width="120px" :model="user" :rules="rules" ref="user" >
        <el-row>
          <el-col>
            <el-form-item label="账号" prop="name">
              <el-input v-model="user.name"  placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="user.pass"  placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="记住密码" prop="delivery">
              <el-switch v-model="user.delivery"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
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
      hasLogin: false,
      user: {
        name: '',
        pass: '',
        delivery: false
      },
       rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
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
    onSubmit(user) {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
    /* if(this.$store.getters.getUser.username) {
        this.user.username = this.$store.getters.getUser.username
        this.user.avatar = this.$store.getters.getUser.avatar
        this.hasLogin = true
      } */
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