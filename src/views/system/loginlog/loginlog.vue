<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="响应状态">
          <el-select
            clearable
            v-model="sreachForm.status"
            placeholder="响应状态"
          >
            <el-option label="成功" value="01"></el-option>
            <el-option label="失败" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input
            clearable
            v-model="sreachForm.userName"
            placeholder="用户名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="initTable()">查询</el-button>
      <el-button type="primary" @click="deleteLog()">删除</el-button>
      <el-button type="primary" @click="batchExport">批量导出</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器" align="center">
        </el-table-column>
        <el-table-column prop="ipaddr" label="ip地址" align="center">
        </el-table-column>
        <el-table-column prop="loginTime" label="登录时间" align="center">
        </el-table-column>
        <el-table-column prop="status" label="登录响应状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === "01" ? "成功" : "失败" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="deleteLog(scope.row)">删除</el-link>
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
</template>
<script>
import { httpPost, httpDelete, postDownload } from "@/http";
export default {
  name: "apiLog",
  data() {
    return {
      sreachForm: {
        status: "",
        userName: ""
      },
      table: {
        data: [],
        height: 0,
        total: 0,
        loading: false,
        currentPage: 1
      },
      logList: [],
      logIdList: [],
      logPageList: {}
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
      this.tableLoading = true;
      httpPost(
        `/system/log/querySysLogLogins/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        if (res.code === "1000000000") {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.table.loading = false;
          this.$nextTick(_ => {
            if (this.logPageList[pageNum]) {
              let arr = this.table.data.filter(item =>
                this.filterData(item.id, this.logPageList[pageNum])
              );
              arr.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            }
          });
        } else {
          this.$message.error("系统异常");
        }
      });
    },
    filterData(id, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          return true;
        }
      }
      return false;
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
      console.log(this.logPageList);
    },
    /**
     * 删除参数
     */
    deleteLog(data) {
      if (data) {
        this.$confirm("此操作将永久删除该日志, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            httpDelete(`/system/log/deleteSysLogLoginByIds`, [data.id]).then(
              res => {
                if (res.code === "1000000000") {
                  this.initTable(this.table.currentPage);
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message.error("删除失败");
                }
              }
            );
          })
          .catch(_ => {});
      } else {
        let arr = this.logList.map(item => item.id);
        if (arr.length === 0) {
          this.$message.error("请选择要删除的日志");
          return false;
        } else {
          this.$confirm("此操作将永久删除当前选中日志, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              httpDelete(`/system/log/deleteSysApiLogByIds`, arr).then(res => {
                if (res.code === "1000000000") {
                  this.initTable(this.table.currentPage);
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message.error("删除失败");
                }
              });
            })
            .catch(_ => {});
        }
      }
    },
    /**
     * 表格复选
     */
   handleSelectionChange(row) {
      console.log(row)
      // 当前页面选中的
      let checkArr = row.map(item => item.id);
      // 当前页面未选中的
      let deCheckArr = this.table.data.map(item=>item.id).filter(
        item => !checkArr.includes(item)
      );
      this.logList = row;
      this.logIdList = this.logIdList.concat(row.map(item => item.id));
      // 过滤掉未选中的
      this.logIdList = this.logIdList.filter(item =>{
        return !deCheckArr.includes(item)
      });
      if (row.length > 0) {
        this.logPageList[this.table.currentPage] = row;
      }
    },
    /**
     * 批量导出
     */
    batchExport() {
      let set = new Set(this.logIdList);
      let data = Array.from(set);
      console.log(data);
      if (data.length > 0) {
        postDownload("/system/log/exportSysLogApi", data).then(res => {
          let flieName = decodeURIComponent(
            res.headers["content-disposition"]
              .split(";")[1]
              .split("filename=")[1]
          );
          const blob = new Blob([res.data]);
          const objecturl = window.URL.createObjectURL(blob);
          const creEleA = document.createElement("a");
          creEleA.setAttribute("href", objecturl);
          creEleA.setAttribute("download", flieName);
          creEleA.click();
        });
      } else {
        this.$message.error("请选择需要导出的日志");
      }
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
