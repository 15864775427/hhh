<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="活动区域">
          <el-select clearable @change="renderTable(true)" v-model="sreachForm.type" placeholder="活动区域">
            <el-option v-for="(item,index) in newsInfoType" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="sreachForm.releaseTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择发布时间"
            @change="renderTable(true)"
            clearable
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="openNews">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column prop="title" label="标题" align="left">
        </el-table-column>
        <el-table-column prop="summary" label="摘要" align="left">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="left">
        </el-table-column>
        <el-table-column
          prop="publishingDepartment"
          label="发布部门"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" align="left">
        </el-table-column>
        <el-table-column prop="releaseTime" label="发布时间" align="left">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="addDialog.title"
      :visible.sync="addDialog.flag"
      width="960px"
    >
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet, postDownload } from "@/http";
export default {
  name: "News",
  data() {
    return {
      newsInfoType:[],
      sreachForm: {
        type: "",
        releaseTime: "",
      },
      table: {
        height: "",
        data: [],
        pageInfo: {
          pageSize: "",
          pageNum: "",
          total: 0,
        },
      },
      addDialog: {
        title: "",
        flag: false,
      },
    };
  },
  computed: {},
  created() {
    this.$store.dispatch("getNewsInfoType").then(() => {
      this.newsInfoType = this.$store.state.newsInfoType;
      console.log('字典：',this.newsInfoType)
    });
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
    this.$nextTick((_) => {
      this.renderTable(true);
    });
  },
  methods: {
    renderTable(flag) {
      if (flag) {
        this.table.pageInfo.pageSize = "10";
        this.table.pageInfo.pageNum = "1";
      }
      const { pageSize, pageNum } = this.table.pageInfo;
      httpPost(`/news/universalNewsInfo/queryAll/${pageNum}/${pageSize}`,this.sreachForm).then(
        (res) => {
          console.log(res)
          if (res.code === "1000000000") {
            this.table.pageInfo.total = res.pageInfo.total;
            this.table.data = res.result;
          }
        }
      )
    },
    handleCurrentChange(val) {
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },
    handleSizeChange(val) {
      this.table.pageInfo.pageNum = 1;
      this.table.pageInfo.pageSize = val;
      this.renderTable();
    },
    openNews() {
      this.addDialog.title = "添加";
      this.addDialog.flag = true;
    },
    addNews(){

    },
    addCancel(){

    }
  },
};
</script>
<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>
