<template>
    <div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>文章管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<div>
			<div style="margin-top: 20px">
				状态:
				<el-radio-group @change="stateChange" v-model="radioState" size="small">
					<el-radio-button label="全部"></el-radio-button>
					<el-radio-button label="广州"></el-radio-button>
					<el-radio-button label="深圳"></el-radio-button>
				</el-radio-group>
			</div>
			<div>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<span style="left: 100px">
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
			radioState: "全部",
			title: "",
			options: [{
				value: "选项1",
				label: "黄金糕"
			}, {
				value: "选项2",
				label: "双皮奶"
			}, {
				value: "选项3",
				label: "蚵仔煎"
			}, {
				value: "选项4",
				label: "龙须面"
			}, {
				value: "选项5",
				label: "北京烤鸭"
			}],
			value: ""
		}
	},
	methods: {
		stateChange() {
			console.log(this.radioState)
		}
	},
	created() {

	}
}
</script>
<style>
.input-with-select {
	background-color: #fff;
	width: 300px;
}
</style>


