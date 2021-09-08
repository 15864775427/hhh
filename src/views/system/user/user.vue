<template>
  <div class="about-box">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="姓名">
          <el-input v-model="sreachForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="sreachForm.sex">
            <el-option label="男" value="01"></el-option>
            <el-option label="女" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态">
          <el-select v-model="sreachForm.onLineStatus">
            <el-option label="在线" value="01"></el-option>
            <el-option label="离线" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="sreachForm.status">
            <el-option label="启用" value="01"></el-option>
            <el-option label="停用" value="02"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addOpenModal">添加</el-button>
      <el-button type="primary" @click="initTable()">查询</el-button>
    </div>
    <div class="about">
      <div class="about-left">
        <div class="about-title">
          <span>部门列表</span>
          <i class="iconfont icon-add add"></i>
          <i class="iconfont icon-edit edit"></i>
          <i class="iconfont icon-ashbin delete"></i>
        </div>
        <div class="about-magin">
          <ds-tree
            :treeData="treeData"
            @node-click="nodeClick"
            @node-open="nodeOpen"
          ></ds-tree>
        </div>
      </div>
      <div class="about-right">
        <div class="about-title">
          用户
        </div>
        <div class="about-magin" id="tablebox">
          <el-table
            :data="table.data"
            v-loading="table.loading"
            :height="table.height"
            v-if="table.height"
          >
            <el-table-column prop="userName" label="名字" align="center">
            </el-table-column>
            <el-table-column prop="deptName" label="部门" align="center">
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                {{ getSexName(scope.row.sex) }}
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status === '01'">{{
                  getStatusName(scope.row.status)
                }}</el-tag>
                <el-tag type="danger" v-else-if="scope.row.status === '02'">{{
                  getStatusName(scope.row.status)
                }}</el-tag>
                <el-tag type="warning" v-else-if="scope.row.status === '03'">{{
                  getStatusName(scope.row.status)
                }}</el-tag>
                <el-tag type="warning" v-else>{{
                  getStatusName(scope.row.status)
                }}</el-tag>
              </template>
            </el-table-column>
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
                <el-link type="primary" @click="openRoleModal(scope.row)"
                  >分配角色</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link
                  type="primary"
                  @click="distributionDepartment(scope.row)"
                  >分配部门</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="resetPassword(scope.row)"
                  >重置密码</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="changeStatus(scope.row)"
                  >更改用户状态</el-link
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
      </div>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex">
            <el-option label="男" value="01"></el-option>
            <el-option label="女" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="form.address" placeholder="住址"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="出生日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职位" prop="post">
          <el-select v-model="form.post" placeholder="职位" clearable>
            <el-option
              v-for="(item, index) in positionList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="uploadPicture"
            :before-upload="beforeImageUpload"
          >
            <img
              v-if="form.picUrl"
              :src="imgBaseUrl + form.picUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="formDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 modal -->
    <el-dialog
      title="分配角色"
      :visible.sync="roleDialog.visible"
      width="30%"
      @close="roleDialogClose"
    >
      <el-checkbox-group v-model="checkRoleList">
        <el-checkbox
          v-for="(item, index) in currRoles"
          :key="index"
          :label="item.name"
        ></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="assignRoleDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配部门 -->
    <el-dialog
      title="分配部门"
      :visible.sync="departmentDialog"
      width="30%"
      @close="assignDepartmentClose"
    >
      <el-tree
        :data="departmentTreeData"
        :props="defaultProps"
        show-checkbox
        :check-strictly="true"
        @check-change="checkChange"
        node-key="id"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="departmentDialog = false">取 消</el-button>
        <el-button type="primary" @click="assignDepartmentDetermine"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 更改状态 -->
    <el-dialog
      title="更改用户状态"
      width="300px"
      :visible.sync="statusDialog"
      @close="changeStatusClose"
    >
      <el-radio-group v-model="editStatus">
        <el-radio label="01">启用</el-radio>
        <el-radio label="02">禁用</el-radio>
        <el-radio label="03">锁定</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusDialog = false">取 消</el-button>
        <el-button type="primary" @click="changeStatusDetermine"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpGet, httpPost, httpDelete, httpPut, imgBaseUrl } from "@/http";
import dsTree from "@/components/tree/tree.vue";
import check from "./check";
export default {
  name: "department",
  data() {
    return {
      sreachForm: {
        deptIds: [],
        name: "",
        onLineStatus: "",
        sex: "",
        status: ""
      },
      treeData: [],
      table: {
        height: "",
        data: [],
        loading: false,
        total: 0,
        currentPage: 1
      },
      dialog: {
        visible: false,
        title: ""
      },
      roleDialog: {
        visible: false
      },
      form: {
        address: "", // 住址
        age: "", // 年龄
        birthday: "", // 出生年月日
        email: "", // 邮箱
        name: "", // 姓名
        phonenumber: "", // 电话
        picUrl: "", // 头像
        post: "", // 职位
        sex: "", // 性别
        userName: "" // 用户名
      },
      rules: check,
      userId: "",
      deptId: "",
      positionList: [], // 职位集合
      imgBaseUrl: imgBaseUrl, // 图片服务根路径
      currRoles: [], // 当前用户拥有角色 即当前用户可分配角色
      eidtUserRoles: [], // 选中用户拥有角色
      checkRoleList: [], // 用户当前分配的角色
      departmentDialog: false, // 分配部门模态框
      departmentTreeData: [], // 部门树
      defaultProps: {
        children: "childDepts",
        label: "name"
      },
      editDepartmentUserId: "", //更改部门 用户id
      statusDialog: false, // 更改状态模态框
      editStatus: "", // 用户状态
      editStatusUserId: "" // 更改状态 用户id
    };
  },
  components: {
    dsTree
  },
  created() {
    this.initTree();
    this.initTable();
    this.$store.dispatch("getPositionList").then(() => {
      this.positionList = this.$store.state.positionList;
    });
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 55;
  },
  methods: {
    initTree() {
      httpGet("/ucenter/dept/queryDepartmentTree").then(res => {
        this.treeData = res.result;
      });
    },
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(`/ucenter/user/queryUser/${pageNum}/10`, this.sreachForm).then(
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
    nodeClick(node) {
      let arr = [];
      arr.push(node.data.id);
      this.sreachForm.deptIds = arr;
    },
    nodeOpen(node) {},
    /**
     * 重置密码
     */
    resetPassword(row) {
      this.$confirm("此操作将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          httpPut(
            `/ucenter/user/resetUserPasswordById/${row.departmentId}/${row.id}`
          ).then(res => {
            if (res.code === "1000000000") {
              this.$message.success("重置成功");
            } else {
              this.$message.error("重置失败");
            }
          });
        })
        .catch(_ => {});
    },
    /**
     * 性别过滤器
     */
    getSexName(sex) {
      if (sex === "01") {
        return "男";
      } else if (sex === "02") {
        return "女";
      } else {
        return "暂无信息";
      }
    },
    /***
     * 用户状态过滤器
     */
    getStatusName(status) {
      if (status === "01") {
        return "启用";
      } else if (status === "02") {
        return "停用";
      } else if (status === "03") {
        return "锁定";
      } else {
        return "未知";
      }
    },
    /**
     * 打开更改状态模态框
     */
    changeStatus(row) {
      this.editStatusUserId = row.id;
      this.editStatus = row.status;
      this.statusDialog = true;
    },
    /**
     * 更改状态确定
     */
    changeStatusDetermine() {
      httpPost(
        `/ucenter/user/updateStatusByid/${this.editStatusUserId}/01/${this.editStatus}`
      ).then(res => {
        if (res.code === "1000000000") {
          this.statusDialog = false;
          this.initTable(this.table.currentPage);
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    changeStatusClose() {
      this.editStatusUserId = "";
      this.editStatus = "";
    },
    /***
     * 打开分配部门模态框
     */
    distributionDepartment(row) {
      this.editDepartmentUserId = row.id;
      httpGet("/ucenter/dept/queryDepartmentTree").then(res => {
        if ((res.code = "1000000000")) {
          this.departmentTreeData = res.result;
          this.departmentDialog = true;
          this.$nextTick(_ => {
            this.$refs.tree.setCheckedKeys([row.departmentId], false);
          });
        }
      });
    },
    /***
     * 编辑部门
     */
    checkChange(data, checked, child) {
      if (checked) {
        this.$nextTick(_ => {
          this.$refs.tree.setCheckedKeys([data.id], false);
        });
      }
    },
    /**
     * 确定分配部门
     */
    assignDepartmentDetermine() {
      let selection = this.$refs.tree.getCheckedKeys();
      httpPut(
        `/ucenter/user/updateUserDeptById/${selection[0]}/${this.editDepartmentUserId}`
      ).then(res => {
        if ((res.code = "1000000000")) {
          this.$message.success("分配成功");
          this.departmentDialog = false;
        } else {
          this.$message.success("分配失败");
        }
      });
    },
    assignDepartmentClose() {
      this.editDepartmentUserId = "";
      this.departmentTreeData = [];
    },
    /**
     * 添加 打开模态框
     */
    addOpenModal() {
      const { deptIds } = this.sreachForm;
      if (deptIds.length === 0) {
        this.$message.error("请先选择部门");
        return false;
      }
      this.dialog.title = "添加用户";
      this.dialog.visible = true;
    },
    /**
     * 打开分配角色模态框
     */
    openRoleModal(row) {
      this.userId = row.id;
      httpGet("/ucenter/user/queryUserRoles").then(res => {
        this.currRoles = res.result;
        this.roleDialog.visible = true;
      });
      httpGet(`/ucenter/user/queryRolesByUserId/${row.id}`).then(res => {
        const { result } = res;
        this.eidtUserRoles = result;
        this.checkRoleList = result.map(item => {
          return item.name;
        });
      });
    },
    /**
     * 分配角色确定
     */
    assignRoleDetermine() {
      httpPost(
        `/ucenter/user/assignUserRole/${this.userId}`,
        this.getChangeRole()
      ).then(res => {
        if (res.code === "1000000000") {
          this.roleDialog.visible = false;
          this.userId = "";
          this.currRoles = [];
          this.eidtUserRoles = [];
          this.checkRoleList = [];
          this.$message({
            type: "success",
            message: "分配成功"
          });
        }
      });
    },
    /***
     * 获取角色修改
     */
    getChangeRole() {
      let currRoles = this.currRoles; // 全部角色 //详细信息集合
      let checkRoleList = this.checkRoleList; // 修改之后的角色集合  //name集合
      let eidtUserRoles = this.eidtUserRoles; // 修改之前的角色集合  //详细信息集合
      let eidtUserNameRoles = eidtUserRoles.map(item => item.name); // 修改之前的角色集合  //name集合
      let addRoleIds = checkRoleList.filter(
        item => !eidtUserNameRoles.includes(item)
      ); //新增
      let delRoleIds = eidtUserNameRoles.filter(
        item => !checkRoleList.includes(item)
      ); //删除

      return {
        addRoleIds: addRoleIds.map(item => {
          for (let i = 0; i < currRoles.length; i++) {
            if (item === currRoles[i].name) {
              return currRoles[i].id;
            }
          }
        }),
        delRoleIds: delRoleIds.map(item => {
          for (let i = 0; i < currRoles.length; i++) {
            if (item === currRoles[i].name) {
              return currRoles[i].id;
            }
          }
        })
      };
    },
    /**
     * 添加 or 修改=>确定
     */
    formDetermine() {
      if (this.userId && this.deptId) {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            httpPut(
              `/ucenter/user/updateUserById/${this.deptId}/${this.userId}`,
              this.form
            ).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.initTable(this.table.currentPage);
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              } else {
                this.$message.error("修改失败");
              }
            });
          }
        });
      } else {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            httpPost(
              `/ucenter/user/addUser/${this.sreachForm.deptIds[0]}`,
              this.form
            ).then(res => {
              this.dialog.visible = false;
              this.initTable(this.table.currentPage);
              if (res.code === "1000000000") {
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
     * modal关闭回调
     */
    dialogClose() {
      //重置表单
      Object.assign(this.$data.form, this.$options.data().form);
      this.$refs.formRef.resetFields();
    },
    /**
     * role modal 关闭回调
     */
    roleDialogClose() {},
    /**
     * 删除用户
     */
    deleteParameter(row) {
      const { departmentId, id } = row;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(`/ucenter/user/deleteUserById/${departmentId}/${id}`).then(
            res => {
              if (res.code === "1000000000") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            }
          );
        })
        .catch(_ => {});
    },
    /**
     * 强制下线
     */
    offLineUser(row) {
      const { userName } = row;
      if (!userName) {
        this.$message.error("下线失败");
        return false;
      }
      this.$confirm("此操作将强制下线该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpGet(`/ucenter/user/offLineUser/${userName}`).then(res => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "下线成功"
              });
            } else {
              this.$message.error("下线失败");
            }
          });
        })
        .catch(_ => {});
    },
    /***
     * 修改用户
     */
    editParameter(row) {
      for (let key in this.form) {
        this.form[key] = row[key];
      }
      this.form.birthday = row.birthday;
      this.deptId = row.departmentId;
      this.userId = row.id;
      this.dialog.title = "修改用户";
      this.dialog.visible = true;
    },
    /***
     * 头像校验
     */
    /***
     * 上传预检
     */
    beforeImageUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const testStr = "jpgpngjpeg";
      if (testStr.indexOf(testmsg) < 0) {
        this.$message.error("上传图片只能是jpg，jpeg 或 png 格式!");
        return false;
      }
    },
    /**
     * 上传头像
     */
    uploadPicture(image) {
      let params = new FormData();
      params.append("file", image.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.form.picUrl = res.result.filePath;
            this.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 时间戳转yyyy-MM-dd
     */
    fmtDate(obj) {
      var date = new Date(obj);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      return (
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length)
      );
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
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
</style>
