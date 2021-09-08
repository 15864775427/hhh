<template>
  <div class="about-box">
    <div class="about">
      <div class="about-left">
        <div class="about-title">
          <span>部门管理</span>
          <i class="iconfont icon-add add"></i>
          <i class="iconfont icon-edit edit"></i>
          <i class="iconfont icon-ashbin delete"></i>
        </div>
        <ds-tree
          :treeData="treeData"
          @node-click="nodeClick"
          @node-open="nodeOpen"
        ></ds-tree>
      </div>
      <div class="about-right">
        <div class="about-title">
          部门管理
        </div>
        <el-form label-width="90px" :model="form">
          <el-form-item label="部门序号">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门代码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="部门邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="部门手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="上级部门ID">
            <el-input v-model="form.superId"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { httpGet } from "@/http";
import dsTree from "@/components/tree/tree.vue";
export default {
  name: "department",
  data() {
    return {
      treeData: [],
      form: {
        sort: "",
        name: "",
        superId: "",
        code: "",
        description: "",
        email: "",
        status: "",
        phone: ""
      }
    };
  },
  components: {
    dsTree
  },
  created() {
    this.initTree();
  },
  methods: {
    initTree() {
      httpGet("/ucenter/dept/queryDepartmentTree").then(res => {
        this.treeData = res.result;
      });
    },
    nodeClick(node) {
      this.queryDepartment(node.data.id);
    },
    nodeOpen(node) {
    },
    queryDepartment(id) {
      httpGet(`/ucenter/dept/queryDepartmentById/${id}`).then(res => {
        for (let key in this.form) {
          this.form[key] = res.result[key];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  margin-left: auto;
  cursor: pointer;
}
.edit {
  cursor: pointer;
}
.delete {
  cursor: pointer;
}
.el-form {
  width: 400px;
}
</style>
