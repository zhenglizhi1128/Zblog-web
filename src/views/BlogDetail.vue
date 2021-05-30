<template>
    <div>
        <div class="mblog">
            <h2>{{ blog.title }}</h2>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
                    编辑
                </router-link>
            </el-link>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
import "github-markdown-css"

export default {
    name: "BlogDetail.vue",
    data() {
        return {
            blog: {
                id: "",
                title: "",
                content: ""
            },
            ownBlog: true
        }
    },
    created() {
		const blogId = this.$route.params.blogId
		this.$http.get("/blog/blog", { id: blogId }).then(res => {
			const blog = res.data
			this.blog.id = blog.id
			this.blog.title = blog.title
			const MarkdownIt = require("markdown-it")
			const md = new MarkdownIt()
			this.blog.content = md.render(blog.blogContent.content)
		})
	}
}
</script>

<style scoped>
.mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
}
</style>