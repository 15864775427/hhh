<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="年份">
          <el-date-picker
            v-model="sreachForm.time"
            type="year"
            placeholder="选择年"
            @change="renderTable(true)"
            clearable
            @clear="renderTable(true)"
            format="yyyy年"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablebox" id="tablebox">
      <el-scrollbar :style="{ height: table.height + 'px' }">
        <div class="listBox">
          <div class="cardBox" v-for="(item, index) in table.data" :key="index">
            <div class="card">
              <div class="cardTitle">
                <span class="name">{{ item.firmName }}</span>
                <span class="button" @click="enterpriseDetails(item)"
                  >详情</span
                >
              </div>
              <div class="cardTime">
                <span>入院时间：{{ item.intime }}</span>
                <span>所属产业：{{ item.industryClass }}</span>
              </div>
              <div class="cardChart">
                <ds-echart :cdata="item"></ds-echart>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="信息详情"
      :visible.sync="dialogVisible"
      width="1200px"
      @close="dialogClose"
    >
      <el-scrollbar style="height: 700px">
        <div class="infoTitle">企业信息</div>
        <div class="infoItem">企业名称：{{ basicInfo.firmName }}</div>
        <div class="infoItem">
          <span>企业名称：{{ basicInfo.businessType }}</span>
          <span style="margin-left: 30px"
            >产业分类{{ basicInfo.industryClass }}</span
          >
        </div>
        <div class="infoItem">入园时间：{{ basicInfo.intime }}</div>
        <div class="infoTitle">
          <span>经济状况</span>
          <span style="width: 500px">
            <el-col :span="11">
              <el-date-picker
                v-model="form.startTime"
                type="year"
                placeholder="选择年"
                @change="startChange"
                format="yyyy年"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="form.endTime"
                type="year"
                placeholder="选择年"
                @change="endChange"
                format="yyyy年"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-col>
          </span>
        </div>
        <div class="chartBox">
          <div class="bar" ref="bar"></div>
          <div class="cake">
            <div ref="cake" style="height: 100%; width: 100%"></div>
            <span class="title"
              >总数：{{
                Number(details.cake.accountConut) +
                Number(details.cake.scienceCount) +
                Number(details.cake.workForce)
              }}</span
            >
          </div>
        </div>
        <div class="table">
          <el-table
            :data="details.table"
            border
            style="width: 100%; height: 250px"
          >
            <el-table-column prop="quarter" label="季度"> </el-table-column>
            <el-table-column prop="generalIncome" label="收入">
            </el-table-column>
            <el-table-column prop="grossProfit" label="利润"> </el-table-column>
            <el-table-column prop="inTax" label="税收"> </el-table-column>
            <el-table-column prop="productionValue" label="产值">
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
import {
  httpPost,
  httpDelete,
  postDownload,
  httpGet,
  imgBaseUrl,
} from "@/http";
import * as echarts from "echarts";
import dsEchart from "./echart.vue";
export default {
  name: "Guidance",
  components: {
    dsEchart,
  },
  data() {
    return {
      sreachForm: {
        time: "2020",
      },
      table: {
        data: [],
        height: "",
        pageInfo: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
        },
      },
      dialogVisible: false,
      basicInfo: {
        firmName: "", // 企业名称
        industryClass: "", // 产业
        intime: "", // 入园时间
        businessType: "", // 行业
      },
      economicsInfo: {},
      form: {
        startTime: "2020",
        endTime: "2020",
        id: "",
      },
      details: {
        table: [],
        bar: {},
        cake: {},
      },
      bar: null,
      cake: null,
    };
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
  },
  created() {
    this.renderTable(true);
  },
  methods: {
    /**渲染表格 */
    renderTable(flag) {
      if (flag) {
        this.table.pageInfo.pageSize = 10;
        this.table.pageInfo.pageNum = 1;
      }
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `/firm/firmAnalyes/quaryAll/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then((res) => {
        if (res.code === "1000000000") {
          this.table.data = res.result;
          this.table.pageInfo.total = res.pageInfo.total;
        }
      });
    },
    currentChange(val) {
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },
    sizeChange(val) {
      this.table.pageInfo.pageSize = val;
      this.renderTable();
    },
    // 详情
    enterpriseDetails(row) {
      this.form.startTime = this.sreachForm.time;
      this.form.endTime = this.sreachForm.time;
      for (let key in this.basicInfo) {
        this.basicInfo[key] = row[key];
      }
      this.dialogVisible = true;
      this.form.id = row.id;
      httpGet(
        `/firm/firmAnalyes/queryInfo/${this.form.startTime}/${this.form.endTime}/${this.form.id}`
      ).then((res) => {
        this.details.table = res.result.mList;
        this.details.bar = res.result.bList;
        this.details.cake = res.result.manageInfo;
        this.renderBar(res.result.bList);
        this.renderCake(res.result.manageInfo);
      });
    },
    // 渲染柱状图
    renderBar(data) {
      // x轴
      let xData = [];
      let legendData = ["收入", "利润", "税收", "产值"];
      let generalIncome = [];
      let grossProfit = [];
      let inTax = [];
      let productionValue = [];
      for (let i = 0; i < data.length; i++) {
        xData.push(data[i].time);
        for (let key in data[i]) {
          if (key === "generalIncome") {
            generalIncome.push(data[i][key] ? data[i][key] : 0);
          } else if (key === "grossProfit") {
            grossProfit.push(data[i][key] ? data[i][key] : 0);
          } else if (key === "inTax") {
            inTax.push(data[i][key] ? data[i][key] : 0);
          } else if (key === "productionValue") {
            productionValue.push(data[i][key] ? data[i][key] : 0);
          }
        }
      }
      let series = [
        {
          name: "收入",
          type: "bar",
          data: generalIncome,
          barWidth: 10,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: "利润",
          type: "bar",
          data: grossProfit,
          barWidth: 10,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: "税收",
          type: "bar",
          data: inTax,
          barWidth: 10,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: "产值",
          type: "bar",
          data: productionValue,
          barWidth: 10,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
        },
      ];
      let chartDom = this.$refs["bar"];
      if (!this.bar) {
        this.bar = echarts.init(chartDom);
      }
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 20,
          left: 60,
          bottom: 20,
          right: 3,
        },
        legend: {
          data: legendData,
        },
        xAxis: {
          type: "category",
          data: xData,
        },
        yAxis: {
          type: "value",
        },

        series: series,
      };
      option && this.bar.setOption(option);
    },
    // 渲染饼图
    renderCake(data) {
      let chartDom = this.$refs["cake"];
      if (!this.cake) {
        this.cake = echarts.init(chartDom);
      }
      let option;
      if (data) {
        option = {
          tooltip: {
            trigger: "item",
          },
          // title:{
          //   text:'总数:'),
          //   left:'33.5%',
          //   top:'45%',
          //   textAlign:"center",
          //   textStyle:{
          //     fontWeight:'normal',
          //     fontSize:"12px"
          //   }
          // },
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              label: {
                show: false,
                position: "center",
              },
              data: [
                { value: data.accountConut, name: "本市人数" },
                { value: data.scienceCount, name: "科技员工" },
                { value: data.workForce, name: "总人数" },
              ],
            },
          ],
        };
      }
      option && this.cake.setOption(option);
    },
    // 起始年份 点击
    startChange(val) {
      if (val && this.form.endTime) {
        let startTime = new Date(val).getTime();
        let endTime = new Date(this.form.endTime).getTime();
        if (startTime < endTime) {
          httpGet(
            `/firm/firmAnalyes/queryInfo/${this.form.startTime}/${this.form.endTime}/${this.form.id}`
          ).then((res) => {
            this.details.table = res.result.mList;
            this.details.bar = res.result.bList;
            this.details.cake = res.result.manageInfo;
            this.renderBar(res.result.bList);
            this.renderCake(res.result.manageInfo);
          });
        } else {
          this.$message.error("起始年份应小于结束年份");
          this.form.startTime="";
        }
      }
    },
    // 结束年份选择
    endChange(val) {
      if (val && this.form.startTime) {
        let staertTime = new Date(this.form.startTime).getTime();
        let endTime = new Date(val).getTime();
        if (staertTime < endTime) {
          httpGet(
            `/firm/firmAnalyes/queryInfo/${this.form.startTime}/${this.form.endTime}/${this.form.id}`
          ).then((res) => {
            this.details.table = res.result.mList;
            this.details.bar = res.result.bList;
            this.details.cake = res.result.manageInfo;
            this.renderBar(res.result.bList);
            this.renderCake(res.result.manageInfo);
          });
        } else {
          this.$message.error("结束年份应大于起始年份");
          this.form.endTime="";
        }
      }
    },
    dialogClose() {
      this.basicInfo = {
        firmName: "", // 企业名称
        industryClass: "", // 产业
        intime: "", // 入园时间
        businessType: "", // 行业
      };
      this.form = {
        startTime: "",
        endTime: "",
        id: "",
      };
      this.details = {
        table: [],
        bar: {},
        cake: {},
      };
      this.bar = null;
      this.cake = null;
    },
  },
};
</script>

<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
/deep/ .el-scrollbar {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  position: relative;
  padding: 0 14px;
}
.listBox {
  display: flex;
  flex-wrap: wrap;
  .cardBox {
    width: 33.3%;
    box-sizing: border-box;
    height: 272px;
    padding: 8px;
  }
}
.card {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 19px;
  color: #646566;
  .cardTitle {
    display: flex;
    justify-content: space-between;
    .name {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
    }
    .button {
      background-color: #e9f0fc;
      color: #276ce3;
      padding: 4px 16px;
      cursor: pointer;
    }
  }
  .cardTime {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }
  .cardChart {
    height: 152px;
  }
}
.infoTitle {
  font-size: 16px;
  font-weight: bold;
  color: #323233;
  display: flex;
  margin-bottom: 20px;
}
.infoItem {
  margin-bottom: 8px;
}
.chartBox {
  display: flex;
  height: 240px;
  .bar {
    flex: 1;
    height: 100%;
  }
  .cake {
    height: 100%;
    width: 240px;
    position: relative;
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
