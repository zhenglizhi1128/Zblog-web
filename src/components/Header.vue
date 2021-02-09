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
        <Login></Login>
      </el-dialog>
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>
  </div>
</template>

<script>
import Login from '../components/Login.vue';
export default {
  components: { Login },
  name: 'Header',
  data() {
    return {
      dialogFormVisible: false,
      hasLogin: false,
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
  },
  created() {
    this.hasLogin = false;
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