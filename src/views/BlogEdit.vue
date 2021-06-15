<template>
    <div>
        <div class="m-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor class="editor" v-model="ruleForm.blogContent.content"></mavon-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import "mavon-editor/dist/markdown/github-markdown.min.css"

export default {
	name: "BlogEdit.vue",
	data() {
		return {
			ruleForm: {
				id: "",
				title: "",
				description: "",
				user: {
					id: this.$store.getters.getUser.id
				},
				blogContent: {
					id: "",
					content: ""
				}
			},
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入摘要', trigger: 'blur'}
                ],
                content: [
					{ required: false, message: "请输入内容", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
			console.log(this.ruleForm.blogContent.content)
			console.log("-------")
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http.post("/blog/edit", this.ruleForm).then(res => {
						this.$alert("操作成功", "提示", {
							confirmButtonText: "确定",
							callback: action => {
								this.$router.push("/blogs")
							}
						})
					})
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
		console.log(this.$store.getters.getUser.id)
		const blogId = this.$route.params.blogId
		if (blogId) {
			this.$http.get("/blog/blog",
				{
					"id": blogId
				}
			).then((res) => {
				const blog = res.data
				this.ruleForm.id = blog.id
				this.ruleForm.title = blog.title
				this.ruleForm.description = blog.description
				this.ruleForm.blogContent.content = blog.blogContent.content
			})
		}

    }
}
</script>
<style scoped>
.m-content {
    max-width: 960px;
    text-align: center;
}
.editor {
    min-height: 600px;
    min-width: 500px;
}
</style>