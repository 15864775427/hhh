<template>
  <div class="alone">
    <div class="operation">
      <el-button type="primary" @click="addOpenModel">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        row-key="id"
        :expand-row-keys="expandRowKeys"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.childs"
              style="width: 100%"
              row-key="id"
              :expand-row-keys="expandRowKeys"
              @expand-change="expandChange"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    :data="props.row.childs"
                    style="width: 100%"
                    row-key="id"
                    :expand-row-keys="expandRowKeys"
                    @expand-change="expandChange"
                  >
                    <el-table-column type="index"> </el-table-column>
                    <el-table-column prop="name" align="center">
                    </el-table-column>
                    <el-table-column prop="icon" align="center">
                      <template slot-scope="scope">
                        <i :class="'iconfont ' + scope.row.icon"></i>
                      </template>
                    </el-table-column>
                    <el-table-column prop="url" align="center">
                    </el-table-column>
                    <el-table-column align="center">
                      <template slot-scope="scope">
                        <el-link
                          type="primary"
                          @click="editOpenModel(scope.row)"
                          >编辑</el-link
                        >
                        <el-divider direction="vertical"></el-divider>
                        <el-link
                          type="primary"
                          @click="deleteMenu(scope.row.id)"
                          >删除</el-link
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column type="index"> </el-table-column>
              <el-table-column prop="name" align="center"> </el-table-column>
              <el-table-column prop="icon" align="center">
                <template slot-scope="scope">
                  <i :class="'iconfont ' + scope.row.icon"></i>
                </template>
              </el-table-column>
              <el-table-column prop="url" align="center"> </el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    @click="addChildOpenModel(scope.row.id)"
                    >添加子级</el-link
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="editOpenModel(scope.row)"
                    >编辑</el-link
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="deleteMenu(scope.row.id)"
                    >删除</el-link
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center">
          <template slot-scope="scope">
            <i :class="'iconfont ' + scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type === "01" ? "菜单" : "按钮" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单路径" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="addChildOpenModel(scope.row.id)"
              >添加子级</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="editOpenModel(scope.row)"
              >编辑</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteMenu(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      >
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option
              :value="item"
              v-for="(item, index) in iconList"
              :key="index"
              ><i :class="'iconfont ' + item"></i
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示">
          <el-switch
            v-model="form.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="01"
            inactive-value="02"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="菜单" value="01"></el-option>
            <el-option label="按钮" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求类型" v-show="form.type === '02'">
          <el-select v-model="form.methodType" placeholder="请选择类型">
            <el-option label="get" value="get"></el-option>
            <el-option label="post" value="post"></el-option>
            <el-option label="delete" value="delete"></el-option>
            <el-option label="put" value="put"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input
            v-model="form.perms"
            placeholder="请输入权限标识"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="01"
            inactive-value="02"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.url" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="form.sort" placeholder="请输入序号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="addMenuDetermine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpGet, httpPut, httpDelete } from "@/http";
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
        loading: false
      },
      dialog: {
        visible: false,
        title: ""
      },
      form: {
        icon: "", // 图标--
        isShow: "01", // 是否显示--
        methodType: "", // 请求类型--
        name: "", // 名称--
        perms: "", // 权限标识--
        status: "01", // 菜单状态--
        type: "", // 类型--
        url: "", // 路径
        superId: "", // 父级ID
        sort: ""
      },
      editId: "", // 编辑ID
      iconList: [
        "icon-calendar",
        "icon-comment",
        "icon-column-vertical",
        "icon-column-horizontal",
        "icon-complete",
        "icon-data-view"
      ],
      expandRowKeys: []
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
    initTable() {
      this.tableLoading = true;
      httpGet("/ucenter/menu/queryUserMenusTrees").then(res => {
        this.table.data = res.result;
        this.table.loading = false;
      });
    },
    /**
     * 关闭模态框
     */
    dialogClose(done) {
      //重置表单
      Object.assign(this.$data.form, this.$options.data().form);
      this.$refs.formRef.resetFields();
      done();
    },
    /**
     * 添加菜单  打开模态框
     */
    addOpenModel() {
      this.dialog.title = "添加菜单";
      this.dialog.visible = true;
    },
    /**
     *  确定
     */
    addMenuDetermine() {
      if (this.editId) {
        httpPut(`/ucenter/menu/updateMenuById/${this.editId}`, this.form).then(
          res => {
            if (res.code === "1000000000") {
              this.dialog.visible = false;
              this.initTable();
            } else {
              this.$message.error("失败");
            }
          }
        );
      } else {
        httpPost("/ucenter/menu/addMenu", this.form).then(res => {
          if (res.code === "1000000000") {
            this.dialog.visible = false;
            this.initTable();
            this.$message({
              type: "success",
              message: "添加成功"
            });
          } else {
            this.$message.error("失败");
          }
        });
      }
    },
    /**
     * 添加子级菜单  打开模态框
     */
    addChildOpenModel(id) {
      this.form.superId = id;
      this.dialog.title = "添加子级";
      this.dialog.visible = true;
    },
    /**
     * 编辑菜单
     */
    editOpenModel(row) {
      this.editId = row.id;
      for (let key in this.form) {
        this.form[key] = row[key];
      }
      this.form.isShow = "01";
      this.dialog.title = "编辑菜单";
      this.dialog.visible = true;
    },
    /**
     *展开回调
     */
    expandChange(row, expandedRows) {
      // for(let i in expandedRows){
      //   this.expandRowKeys.push(expandedRows[i])
      // }
    },
    /***
     * 删除
     */
    deleteMenu(id) {
      httpDelete(`/ucenter/menu/deleteMenuById/${id}`).then(res => {
        if (res.code === "1000000000") {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.initTable();
        } else {
        }
      });
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
