<template>
    <div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/centralControl' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>标签管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button
			size="medium"
			type="primary"
			icon="el-icon-plus"
			@click="addlabel()"
		>新增
		</el-button>
		<el-divider></el-divider>
		<el-table :data="tableData" stripe style="width: 100%">
			<template slot="empty">
                <div>暂无数据</div>
            </template>
            <el-table-column label="名称" align="center" width="150">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </div>
				</template>
			</el-table-column>
			<el-table-column label="添加日期" align="center" width="150">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">
                        {{ scope.row.createTime | dateformat("YYYY-MM-DD") }}
                    </span>
				</template>
			</el-table-column>
			<el-table-column label="修改日期" align="center" width="150">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">
                        {{ scope.row.updateTime | dateformat("YYYY-MM-DD") }}
                    </span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						icon="el-icon-edit"
                        @click="modifylabel(scope.row.id, scope.row.name)"
                    >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="deletelabel(scope.row.id)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "LabelSet.vue",
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        addlabel() {
            this.$prompt("请输入名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showClose: true,
                closeOnHashChange: false,
                closeOnClickModal: false,
                inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/,
                inputErrorMessage: "输入的数据不合法!",
                beforeClose: (action, instance, done) => {
                    const labelname = instance.inputValue
                    if (action === "confirm") {
                        this.$http
                            .get("/label/countLabel", {name: labelname})
                            .then((res) => {
                                const num = res.data
                                if (num > 0) {
                                    this.$message({
                                        type: "success",
                                        message: "标签名称重复！"
                                    })
                                } else {
                                    this.$http
                                        .post("/label/label", {
                                            name: labelname
                                        })
                                        .then(() => {
                                            done()
                                            this.labels()
                                            this.$message({
                                                type: "success",
                                                message: "添加成功"
                                            })
                                        })
                                }
                            })
                    } else {
                        done()
                    }
                }
            }).catch(() => {
            })
        },
        modifylabel(id, name) {
            this.$prompt("请输入名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showClose: false,
                inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/,
                inputErrorMessage: "输入的数据不合法!",
                inputValue: name,
                beforeClose: (action, instance, done) => {
                    const labelname = instance.inputValue
                    if (action === "confirm") {
                        if (name === labelname) {
                            done()
                        } else {
                            this.$http
                                .put("/label/update", {
                                    name: labelname,
                                    id: id
                                })
                                .then(() => {
                                    done()
                                    this.labels()
                                    this.$message({
                                        type: "success",
                                        message: "修改成功"
                                    })
                                })
                        }
                    } else {
                        done()
                    }
                }
            }).catch(() => {
            })
        },
        deletelabel(id) {
            this.$confirm("是否删除此标签?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$http.delete("/label/delete", {id: id}).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        })
                        this.labels()
                    })
                })
                .catch(() => {
                })
        },
        labels() {
            this.$http.get("/label/labels").then((res) => {
                this.tableData = res.data
            })
        }
    },
    created() {
        this.labels()
    }
}
</script>


