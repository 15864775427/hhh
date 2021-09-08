<template>
  <div class="alone">
    <el-checkbox
      class="checkAll"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      v-if="!isDetails"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="信息类型">
          <el-select
            v-model="sreachForm.type"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option label="会议" value="02"></el-option>
            <el-option label="新闻" value="01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="sreachForm.releaseTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:hh:mm"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            placeholder="标题"
            clearable
            v-model="sreachForm.title"
            @clear="initTable()"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="initTable()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="examine('03')">批量通过</el-button>
      <el-button type="primary" @click="examine('04')">批量拒绝</el-button>
      <el-button type="primary" @click="examineAll('03')">全部通过</el-button>
      <el-button type="primary" @click="examineAll('04')">全部拒绝</el-button>
    </div>
    <div class="tablebox" id="tablebox" v-if="!isDetails">
      <ul
        v-loading="table.loading"
        :style="{ height: table.height + 'px' }"
        v-if="table.height"
        class="tableList"
        ref="tableList"
      >
        <el-scrollbar>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <li class="tableItem" v-for="item in table.data" :key="item.id">
              <el-checkbox :label="item.id">&nbsp;</el-checkbox>
              <img class="coverPicture" :src="item.coverPicture" alt="" />
              <div class="main">
                <div class="tableItemTitle">{{ item.title }}</div>
                <div class="content">
                  {{ item.brief }}
                  <br />
                  <span class="seeAll" @click="toDetails(item.id)"
                    >[查看全部]</span
                  >
                </div>
              </div>
              <div class="date">
                <div class="year">2021</div>
                <div class="month">6.16</div>
              </div>
              <div class="tagBox">
                <el-tag v-if="item.postStatus === '02'">待审核</el-tag>
                <el-tag v-if="item.postStatus === '03'" type="success"
                  >已通过</el-tag
                >
                <el-tag v-if="item.postStatus === '04'" type="success"
                  >已拒绝</el-tag
                >
              </div>
              <div class="footer">
                <el-link type="primary" @click="deleteInfo(item.id)"
                  >删除</el-link
                >
              </div>
            </li>
          </el-checkbox-group>
        </el-scrollbar>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>
    <div class="details" v-if="isDetails && detailsInfo.type === '01'">
      <el-scrollbar>
        <el-page-header @back="goBack" content="详情页面"> </el-page-header>
        <div class="title">{{ detailsInfo.title }}</div>
        <div class="splitLine">{{ detailsInfo.releaseTime }}</div>
        <blockquote>
          {{ detailsInfo.brief }}
        </blockquote>
        <div v-html="detailsInfo.content"></div>
      </el-scrollbar>
    </div>
    <div class="meeting" v-if="isDetails && detailsInfo.type === '02'">
      <el-page-header @back="goBack" content="详情页面"> </el-page-header>
      <div v-html="detailsInfo.content" class="main"></div>
    </div>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet, postDownload } from "@/http";
export default {
  name: "TargetEnterprise",
  data() {
    return {
      // end
      sreachForm: {},
      table: {
        data: [],
        height: "",
        total: 0,
        loading: false,
        currentPage: 1
      },
      isDetails: false,
      detailsInfo: {},
      isIndeterminate: false,
      checkAll: false,
      allCheckList: [],
      checkedCities: []
    };
  },
  created() {},
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
    this.$nextTick(_ => {
      this.initTable();
    });
  },
  methods: {
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      this.isIndeterminate = false;
      this.checkAll = false;
      this.allCheckList = [];
      this.checkedCities = [];
      httpPost(
        `/medicalinfo/medicalConsultationInfo/queryMedicalConsultationInfoAll/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        this.$refs.tableList.scrollTop = 0;
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
        this.allCheckList = res.result.map(item => item.id);
        this.table.loading = false;
      });
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    toDetails(id) {
      this.isDetails = true;
      httpGet(
        `/medicalinfo/medicalConsultationInfo/MedicalConsultationInfo/${id}`
      ).then(res => {
        this.detailsInfo = res.result;
        if (res.result.type === "02") {
          this.$nextTick(_ => {
            this.chickEndtime();
          });
        }
      });
    },
    goBack() {
      this.isDetails = false;
    },
    chickEndtime() {
      var endtime = new Date(
        (document.querySelector(".time-box").innerText.split("至")[0] +=
          " 08:00:00")
      ); //获取结束时间
      //获得当前时间
      var stratTime = new Date();
      let total = (endtime.getTime() - stratTime.getTime()) / 1000;
      var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
      var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
      var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
      var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
      var min = parseInt(afterHour / 60); //计算整数分
      var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
      console.log(document.getElementById("t_d"));
      document.getElementById("t_d").innerText = day;
      document.getElementById("t_h").innerText = hour;
      document.getElementById("t_m").innerText = min;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.allCheckList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allCheckList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allCheckList.length;
    },
    /**
     * 审核
     */
    examine(val) {
      httpPost(
        `/medicalinfo/medicalConsultationInfo/updateAllStarts/${val}`,
        this.checkedCities
      ).then(res => {
        if (res.code === "1000000000") {
          if (val === "03") {
            this.initTable();
            this.$message.success("批量通过成功");
          } else {
            this.initTable();
            this.$message.success("批量拒绝成功");
          }
        } else {
          this.$message.error("审核失败");
        }
      });
    },
    examineAll(val) {
      httpPost(
        `/medicalinfo/medicalConsultationInfo/updateAllStarts/${val}`
      ).then(res => {
        if (res.code === "1000000000") {
          if (val === "03") {
            this.initTable();
            this.$message.success("全部通过成功");
          } else {
            this.initTable();
            this.$message.success("全部拒绝成功");
          }
        } else {
          this.$message.error("审核失败");
        }
      });
    },
    deleteInfo(id) {
      httpDelete(
        `/medicalinfo/medicalConsultationInfo/deleteMedicalConsultationInfoById/${id}`
      ).then(res => {
        if (res.code === "1000000000") {
          this.initTable();
          this.$message.success("删除成功");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.operation {
  padding-left: 60px;
}
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
.el-scrollbar {
  height: 100%;
}
.tableItem + .tableItem {
  margin-top: 30px;
}
.tableItem {
  display: flex;
  align-items: center;
  .coverPicture {
    width: 230px;
    height: auto;
    margin-left: 20px;
  }
  .main {
    margin-left: 20px;
    font-size: 14px;
    color: #000;
    .tableItemTitle {
      font-weight: bold;
      color: #323233;
    }
    .content {
      color: #646566;
      margin-top: 10px;
      .seeAll {
        color: #276ce3;
        cursor: pointer;
      }
    }
    flex: 1;
  }
  .date {
    margin-left: 60px;
    border-left: 1px solid #ddd;
    width: 100px;
    box-sizing: border-box;
    padding-left: 30px;
    color: #969799;
    .year {
      font-size: 20px;
    }
    .month {
      font-size: 14px;
    }
  }
  .footer {
    width: 80px;
    text-align: center;
  }
}
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 300px;
  overflow: auto;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
  .splitLine {
    text-align: right;
    box-sizing: border-box;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    color: #969799;
  }
  blockquote {
    padding: 10px 20px;
    margin: 20px 20px 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
}
.meeting {
  position: absolute;
  top: 0;
  background-color: #fff;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  .main {
    margin-top: 20px;
  }
}

.el-link + .el-link {
  margin-left: 10px;
}
.checkAll {
  position: absolute;
  top: 34px;
  left: 20px;
}
.tagBox {
  text-align: center;
}
</style>
