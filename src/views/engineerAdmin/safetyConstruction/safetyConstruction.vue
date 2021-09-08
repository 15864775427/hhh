<template>
  <div class="alone">
    <div class="operation">
      <el-radio-group v-model="radio1" @change="headRadioChange">
        <el-radio-button label="1">全部</el-radio-button>
        <el-radio-button label="2">已处理</el-radio-button>
        <el-radio-button label="3">已上报</el-radio-button>
      </el-radio-group>
      <div class="operation_lef">
        <span>更多</span><span><i class="el-icon-arrow-right"></i></span>
      </div>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template>
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      radio1: "1",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    headRadioChange(row) {
      console.log(row);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.operation .operation_lef {
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    &:nth-child(2) {
      display: inline-block;
      background: #276ce3;
      border-radius: 50%;
      margin: 0 5px;
      i {
        margin: 3px;
        font-size: 14px;
        color: white;
      }
    }
  }
}
</style>
