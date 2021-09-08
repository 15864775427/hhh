<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="角色编码">
          <el-input clearable placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input clearable placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">批量下线</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
      >
        <el-table-column prop="userName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="角色编码" align="center">
        </el-table-column>
        <el-table-column prop="post" label="职位" align="center">
          <template slot-scope="scope">
            <span>{{getPostName(scope.row.post)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="offLineUser(scope.row)"
              >强制下线</el-link
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
</template>
<script>
import { httpGet, httpPost } from "@/http";
export default {
  name: "onlineuser",
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
      positionList:[]
    };
  },
  created() {
    this.initTable();
    this.$store.dispatch("getPositionList").then(() => {
      this.positionList = this.$store.state.positionList;
    });
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
      httpGet(`/ucenter/user/onlineUser/${this.sreachForm.name}/${pageNum}/10`).then(res => {
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
    /***
     * 强制下线
     */
    offLineUser(row) {
      httpGet(`/ucenter/user/offLineUser/${row.userName}`).then(res => {
        if (res.code === "1000000000") {
          this.$message({
            type: "success",
            message: "下线成功"
          });
        } else {
          this.$message.error("下线失败");
        }
      });
    },
    /**
     * 职位字典换汉字
     */
    getPostName(val){
      let positionList =this.positionList;
      for(let i=0;i<positionList.length;i++){
        if(positionList[i].value===val){
          return positionList[i].name
        }
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
