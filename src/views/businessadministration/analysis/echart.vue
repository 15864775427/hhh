<template>
  <div ref="echart" class="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "echart",
  props: {
    cdata: Object
  },
  data() {
    return {
      echart: null
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.renderEchart();
    });
  },
  watch: {
    cdata() {
      this.renderEchart();
    }
  },
  methods: {
    renderEchart() {
      let xData = [];
      let data = [];
      for (let key in this.cdata) {
        if (key === "generalIncome") {
          xData.push("总收入");
          data.push(this.cdata[key] ? this.cdata[key] : 0);
        } else if (key === "grossProfit") {
          xData.push("总利润");
          data.push(this.cdata[key] ? this.cdata[key] : 0);
        } else if (key === "inTax") {
          xData.push("税收");
          data.push(this.cdata[key] ? this.cdata[key] : 0);
        } else if (key === "productionValue") {
          xData.push("工业产值");
          data.push(this.cdata[key] ? this.cdata[key] : 0);
        }
      }
      let chartDom = this.$refs["echart"];
      if (!this.echart) {
        this.echart = echarts.init(chartDom);
      }
      let option;
      option = {
        grid: {
          top: 20,
          left: 60,
          bottom: 20,
          right: 3
          //   show: false
        },
        xAxis: {
          type: "category",
          data: xData
        },
        yAxis: {
          type: "value"
        },

        series: [
          {
            data: data,
            type: "bar",
            barWidth: 10,
            itemStyle: {
              color: function(params) {
                var colorList = ["#276CE3", "#ED6A0C", "#01BBB5", "#F25353"];
                return colorList[params.dataIndex];
              },
              borderRadius: [5, 5, 0, 0]
            }
          }
        ]
      };
      option && this.echart.setOption(option);
    }
  },
  beforeDestroy() {
    if (this.echart) {
      this.echart.dispose();
    }
  }
};
</script>
<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
