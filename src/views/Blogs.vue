<template>
  <div class="mcontaner">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.createTime | dateformat('YYYY-MM-DD')"
          placement="top"
          v-for="blog in blogs"
        >
          <el-card>
            
            <el-link :underline="false"   @click="detail(blog.id)" >
            <h4>{{ blog.title}}</h4>
            </el-link>
          
            <el-link :underline="false"   @click="detail(blog.id)" >
              <p>{{ blog.description }}</p>
            </el-link>
            <p>{{ blog.createTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blogs.vue',
  data() {
    return {
      reverse: true,
      blogs: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  methods: {
    page(currentPage) {
      this.$axios
        .get('/blog/blogs', {
          params: {
            currentPage: currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.blogs = res.data.data.list;
          this.currentPage = res.data.data.pageNum;
          this.total = res.data.data.total;
          this.pageSize = res.data.data.pageSize;
        });
    },
    detail(blogId) {
        const new1 = this.$router.resolve({name: 'BlogDetail',params: {blogId: blogId}})
        window.open(new1.href,'_blank')
    },
  },
  created() {
    this.page(1);
  },
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>
