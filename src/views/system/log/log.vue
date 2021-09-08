<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="请求IP">
          <el-input
            clearable
            v-model="sreachForm.requestIp"
            placeholder="请求IP"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input
            clearable
            v-model="sreachForm.userName"
            placeholder="用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input
            clearable
            v-model="sreachForm.userType"
            placeholder="用户类型"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="batchExport">批量导出</el-button>
      <el-button type="primary" @click="initTable()">查询</el-button>
      <el-button type="primary" @click="deleteLog()">删除</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        ref="multipleTable"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="requestMethod" label="请求类型" align="center">
        </el-table-column>
        <el-table-column prop="requestSchema" label="请求协议" align="center">
        </el-table-column>
        <el-table-column prop="executeTime" label="响应时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.executeTime }}ms</span>
          </template>
        </el-table-column>
        <el-table-column prop="requestTime" label="请求时间" align="center">
        </el-table-column>
        <el-table-column prop="responseTime" label="返回时间" align="center">
        </el-table-column>
        <el-table-column prop="targetServer" label="目标服务" align="center">
        </el-table-column>
        <el-table-column prop="requestPath" label="请求路径"> </el-table-column>
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
        requestIp: "",
        userType: "",
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
      logPageList: []
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
        `/system/log/querySysLogApis/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        if (res.code === "1000000000") {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.table.loading = false;
          this.$nextTick(_ => {
            if (this.logPageList.length > 0) {
              let arr = this.table.data.filter(item =>
                this.filterData(item.id)
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
    filterData(id) {
      for (let i = 0; i < this.logPageList.length; i++) {
        if (this.logPageList[i].id === id) {
          return true;
        }
      }
      return false;
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
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
            httpDelete(`/system/log/deleteSysLogApiByIds`, [data.id]).then(
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
      this.logList = row;
      this.logIdList = this.logIdList.concat(row.map(item => item.id));
      if (row.length > 0) {
        let arr = this.logPageList.concat(row);
        let data = arr.filter((currentValue, index, arr) => {
          return arr.indexOf(currentValue) === index;
        });
        this.logPageList = data;
      }
    },
    /**
     * 批量导出
     */
    batchExport() {
      let set = new Set(this.logIdList);
      let data = Array.from(set);
      console.log(data);

      postDownload("/system/log/exportSysLogApi", data).then(res => {
        console.log(res)
        if (res.data.code) {
          this.$message.error("下载失败");
        } else {
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
