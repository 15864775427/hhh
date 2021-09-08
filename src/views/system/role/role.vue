<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="角色编码">
          <el-input
            clearable
            v-model="sreachForm.code"
            placeholder="角色编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input
            clearable
            v-model="sreachForm.name"
            placeholder="角色名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="initTable()">查询</el-button>
      <el-button type="primary" @click="addParameter">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
      >
        <el-table-column prop="name" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="code" label="角色编码" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="顺序" align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="editParameter(scope.row)"
              >编辑</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteParameter(scope.row)"
              >删除</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="distribution(scope.row)"
              >分配菜单权限</el-link
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
      @close="dialogClose"
    >
      <el-form
        label-position="right"
        label-width="107px"
        :model="form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="sort">
          <el-input v-model="form.sort" placeholder="顺序"></el-input>
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
    <!-- 菜单树 -->
    <el-dialog
      title="分配菜单权限"
      :visible.sync="distributionVisible"
      @close="changedDialogClose"
      width="30%"
    >
      <el-tree
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributionVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignMenuDetermine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpGet, httpPost, httpDelete, httpPut } from "@/http";
import check from "./check";
export default {
  name: "dictvalue",
  data() {
    return {
      sreachForm: {
        code: "",
        name: ""
      },
      table: {
        data: [],
        height: 0,
        total: 0,
        loading: false,
        currentPage: 1
      },
      dialog: {
        visible: false,
        title: ""
      },
      distributionVisible: false,
      form: {
        name: "", // 名称
        code: "", // 代码
        sort: "", // 序号
        description: "" // 描述
      },
      editId: 0,
      rules: check,
      treeData: [],
      defaultProps: {
        children: "childs",
        label: "name"
      },
      changeMenuId: 0,
      checkTreeData: [],
      assigned: []
    };
  },
  created() {
    this.initTable();
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
  },
  methods: {
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      let params = { code: this.sreachForm.code, name: this.sreachForm.name };
      this.tableLoading = true;
      httpPost(`/ucenter/role/queryRoles/${pageNum}/10`, params).then(res => {
        if (res.code === "1000000000") {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.table.loading = false;
        } else {
          this.$message.error("系统异常");
        }
      });
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    /**
     * 添加角色
     */
    addParameter() {
      this.dialog.title = "添加角色";
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
              `/ucenter/role/updateRoleById/${this.editId}`,
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
            httpPost("/ucenter/role/addRole", this.form).then(res => {
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
     * 删除参数
     */
    deleteParameter(data) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          httpDelete(`/ucenter/role/deleteRoleById/${data.id}`).then(res => {
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
        })
        .catch(_ => {});
    },
    /**
     * 编辑参数
     */
    editParameter(data) {
      this.dialog.title = "编辑参数";
      this.$nextTick(_ => {
        this.$refs.formRef.resetFields();
        this.form.code = data.code; // 代码
        this.form.name = data.name; // 名称
        this.form.sort = data.sort; // 顺序
        this.form.description = data.description; // 描述
      });
      this.editId = data.id;
      this.dialog.visible = true;
    },
    /**
     * 分配菜单权限
     */
    distribution(row) {
      this.changeMenuId = row.id;
      //全部菜单
      httpGet("/ucenter/menu/queryUserMenusTrees").then(res => {
        this.treeData = res.result;
        let arr = this.multiarrFilter(this.treeData);
        // 已分配菜单
        httpGet(`/ucenter/menu/queryMenusByRoleId/${row.id}`).then(res => {
          // 已分配菜单
          this.assigned = res.result.map(item => item.id);
          // 过滤过的赋值数据
          let treeData = this.assigned.filter(item => !arr.includes(item));
          this.$nextTick(_ => {
            this.$refs.tree.setCheckedKeys(treeData, false);
          });
        });
      });
      this.distributionVisible = true;
    },
    /**
     * 递归获取有子节点的ID
     */
    multiarrFilter(obj) {
      let arr = [];
      if (Array.isArray(obj)) {
        obj.map(item => {
          arr = arr.concat(this.multiarrFilter(item));
        });
      } else {
        if (obj.childs.length > 0) {
          arr.push(obj.id);
          arr = arr.concat(this.multiarrFilter(obj.childs));
        }
      }
      return arr;
    },
    /**
     *递归获取所有id
     */
    multiarr(obj) {
      let arr = [];
      for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].id);
        if (obj[i].childs.length > 0) {
          arr = arr.concat(this.multiarr(obj[i].childs));
        }
      }
      return arr;
    },
    /**
     * 分配菜单权限确定
     */
    assignMenuDetermine() {
      httpPost(
        `/ucenter/role/assignRoleMenus/${this.changeMenuId}`,
        this.getChanged()
      ).then(res => {
        if ((res.code = "1000000000")) {
          this.distributionVisible = false;
          this.$message({
            type: "success",
            message: "配置成功"
          });
        }
      });
    },
    /***
     * 获取菜单权限变化
     */
    getChanged() {
      let assigned = this.assigned; // 已选中菜单
      let semiSelection = this.$refs.tree.getHalfCheckedKeys(); // 半选状态集合
      let allSelection = this.$refs.tree.getCheckedKeys();
      let checkTreeData = allSelection.concat(semiSelection); // 修改后的菜单
      return {
        addMenuIds: checkTreeData.filter(item => !assigned.includes(item)),
        delMenuIds: assigned.filter(item => !checkTreeData.includes(item))
      };
    },
    /**
     * 分配菜单权限 模态框关闭
     */
    changedDialogClose() {
      this.assigned = [];
      this.checkTreeData = [];
      this.treeData = [];
      this.changeMenuId = 0;
    },
    /**
     * 关闭模态框回调
     */
    dialogClose(done) {
      Object.assign(this.$data.form, this.$options.data().form);
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
