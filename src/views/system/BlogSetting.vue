<template>
    <div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>文章管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<div style="width: 100%;">
			<span style="margin-top: 20px">
				状态:
				<el-radio-group @change="stateChange" v-model="status" size="medium">
					<el-radio-button label= -100 >全部</el-radio-button>
					<el-radio-button label=1 >启用</el-radio-button>
					<el-radio-button label=0 >禁用</el-radio-button>
				</el-radio-group>
			</span>
			<span>
        标签：
				<el-select v-model="labelId" filterable placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</span>
      &nbsp;&nbsp;&nbsp;
			<span>
				<el-input placeholder="输入文章标题" v-model="title" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</span>
		</div>
	</div>
</template>

<script>
export default {
    name: "BlogSetting.vue",
    data() {
		return {
      status:-100,
			title: "",
			options: [],
      labelId:""
		}
	},
	methods: {
		stateChange() {
      this.initialize(this.labelId,this.status,this.title);
		},
    initialize(labelId,status,title) {
      const params = {
        labelId:labelId,
        status:status,
        title:title
      }
      this.$http.get("/blog/set/blogs",params).then((res) => {
        const data = res.data;
        console.log(data.labels);
        this.options=data.labels;
      })
    }
	},
	created() {
    this.initialize(-100,this.status,this.title);
	}
}
</script>
<style>
.input-with-select {
	background-color: #fff;
	width: 300px;
}
</style>


