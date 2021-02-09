<template>
  <section>
    <el-container>
      <el-form label-width="120px" :model="User" :rules="Rules" ref="User">
        <el-row>
          <el-col>
            <el-form-item label="账号" prop="name">
              <el-input v-model.number="User.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="User.pass" auto-complete="new-password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="记住密码" prop="delivery">
              <el-switch v-model="User.delivery"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="submitForm()">登 录</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '提交成功',
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
};
</script>

<style scoped>
</style>
