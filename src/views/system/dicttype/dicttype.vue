<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="字典类型代码">
          <el-input
            v-model="sreachForm.code"
            placeholder="字典类型代码"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典类型名称">
          <el-input
            v-model="sreachForm.name"
            placeholder="字典类型名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="initTable()">查询</el-button>
      <el-button type="primary" @click="addParameter">添加</el-button>
      <el-button type="primary" @click="deletesParameter">删除</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
      >
        <el-table-column prop="name" label="字典类型名称" align="center">
        </el-table-column>
        <el-table-column prop="code" label="字典类型代码" align="center">
        </el-table-column>
        <el-table-column prop="description" label="备注"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="editParameter(scope.row)"
              >编辑</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteParameter(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>
    <!-- 添加 and 编辑 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="30%"
      :before-close="dialogClose"
    >
      <el-form
        label-position="right"
        label-width="107px"
        :model="form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="字典类型名称" prop="name">
          <el-input v-model="form.name" placeholder="字典类型名称"></el-input>
        </el-form-item>
        <el-form-item label="字典类型代码" prop="code">
          <el-input v-model="form.code" placeholder="字典类型代码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="描述"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="addParameterDetermine"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut } from "@/http";
import check from "./check";
export default {
  name: "dicttype",
  data() {
    return {
      sreachForm: {
        code: "",
        name: ""
      },
      table: {
        data: [],
        height: 0,
        loading: false,
        total: 0,
        currentPage: 1
      },
      dialog: {
        visible: false,
        title: ""
      },
      form: {
        code: "",
        name: "",
        description: ""
      },
      editId: 0,
      rules: check
    };
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
    this.initTable();
  },
  methods: {
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      let params = { code: this.sreachForm.code, name: this.sreachForm.name };
      this.tableLoading = true;
      httpPost(`/system/dict/queryDictTypes/${pageNum}/10`, params).then(
        res => {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.table.loading = false;
        }
      );
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    /**
     * 添加参数
     */
    addParameter() {
      this.dialog.title = "添加参数";
      this.dialog.visible = true;
    },
    /**
     * 添加参数确定 and 编辑参数确定
     */
    addParameterDetermine() {
      if (this.editId) {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            httpPut(
              `/system/dict/updateDictTypeById/${this.editId}`,
              this.form
            ).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      } else {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            httpPost("/system/dict/addDictType", this.form).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      }
    },
    /**
     * 批量删除参数
     */
    deletesParameter() {},
    /**
     * 删除参数
     */
    deleteParameter(data) {
      this.$confirm("此操作将永久删除该字典类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        httpDelete(`/system/dict/deleteDictTypeById/${data.id}`).then(res => {
          if (res.code === "1000000000") {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.initTable(this.currentPage);
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(()=>{});
    },
    /**
     * 编辑参数
     */
    editParameter(data) {
      this.dialog.title = "编辑参数";
      this.$nextTick(_ => {
        this.$refs.formRef.resetFields();
        this.form.name = data.name;
        this.form.code = data.code;
        this.form.description = data.description;
      });
      this.editId = data.id;
      this.dialog.visible = true;
    },
    /**
     * 关闭模态框回调
     */
    dialogClose(done) {
      //重置表单
      this.$refs.formRef.resetFields();
      // 重置编辑id
      this.editId = 0;
      done();
    }
  }
};
</script>
<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-button {
  height: 40px;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
</style>
