<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName">
      <el-tab-pane label="资质预审" name="first"
        ><div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="指标类型">
              <el-select v-model="sreachForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索指标名称"
                clearable
                v-model="sreachForm.any"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="批量操作">
              <el-button plain class="but">一键处理</el-button>
              <el-button plain>一键处理</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-checkbox v-model="sreachForm.checked">待处理</el-checkbox>
              <el-checkbox v-model="sreachForm.checked">已驳回</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableData"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="date"
              label="企业名称"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="企业法人"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="联系方式"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="企业类型"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="所属行业"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="所属产业"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="资质类型"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核状态"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="right"
              width="120px"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  plain
                  @click="disposeFun(scope.row)"
                  size="small"
                  >立即处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
        <!-- 立即处理 -->
        <el-dialog title="立即处理" :visible.sync="dialogVisible">
           <div class="dialogDvScroll">
          <div class="head_essential">企业信息</div>
          <el-form :model="form">
            <el-form-item
              label="公司名称:"
              :label-width="formLabelWidthDetails"
            >
              <div>北京京诚凤凰工业炉工程技术有限公司</div>
            </el-form-item>
            <div class="el_form">
              <el-form-item
                label="公司法人:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">王宇</div>
              </el-form-item>
              <el-form-item
                label="联系方式:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">1542544445</div>
              </el-form-item>
            </div>
            <div class="el_form">
              <el-form-item
                label="企业类型:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">住宿餐饮业</div>
              </el-form-item>
              <el-form-item
                label="所属行业:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">住宿餐饮业</div>
              </el-form-item>
            </div>
            <div class="el_form">
              <el-form-item
                label="所属行业:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">现代中药</div>
              </el-form-item>
              <el-form-item
                label="资质类型:"
                :label-width="formLabelWidthDetails"
              >
                <div class="from_item">中关村高新技术企业</div>
              </el-form-item>
            </div>
            <el-form-item
              label="注册资金:"
              :label-width="formLabelWidthDetails"
            >
              <div>151,545,656万元</div>
            </el-form-item>
            <el-form-item
              label="注册地址:"
              :label-width="formLabelWidthDetails"
            >
              <div>北京市大兴区黄村火车站55号楼</div>
            </el-form-item>
            <el-form-item label="附件:" :label-width="formLabelWidthDetails">
              <div>文件名称</div>
              <div>文件名称</div>
              <div>文件名称</div>
              <div>文件名称</div>
            </el-form-item>
          </el-form>
          <div class="head_essential">立即处理</div>
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidthDetails">
              <el-radio-group v-model="form.resource">
                <el-radio label="通过"></el-radio>
                <el-radio label="不通过"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidthDetails">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.textarea"
                maxlength="100"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="资质申报" name="second"
        ><div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="指标类型">
              <el-select v-model="sreachForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索指标名称"
                clearable
                v-model="sreachForm.any"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
           <el-button
            type="primary"
            plain
            size="small"
            @click="dialogFormVisible = true"
            >材料提交</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="dialogFormVisible = true"
            >正式申报</el-button
          >
        </div>
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="批量操作">
              <el-button plain class="but">一键处理</el-button>
              <el-button plain>一键处理</el-button>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            plain
            size="small"
            @click="dialogFormVisible = true"
            >材料确认</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="dialogFormVisible = true"
            >正式申报</el-button
          >
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableData"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="date"
              label="企业名称"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="企业法人"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="联系方式"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="企业类型"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="所属行业"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="所属产业"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="资质类型"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核状态"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册资金"
              align="left"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="right"
              width="120px"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  plain
                  @click="CheckPlanFun(scope.row)"
                  size="small"
                  >查看进度</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>

          <!-- 查看进度 -->
          <el-dialog title="查看进度" :visible.sync="dialogFormCheck">
            <div class="dialogDvScroll">
              <div class="head_essential">企业信息</div>
              <el-form :model="form">
                <el-form-item
                  label="公司名称:"
                  :label-width="formLabelWidthDetails"
                >
                  <div>北京京诚凤凰工业炉工程技术有限公司</div>
                </el-form-item>
                <div class="el_form">
                  <el-form-item
                    label="公司法人:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">王宇</div>
                  </el-form-item>
                  <el-form-item
                    label="联系方式:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">1542544445</div>
                  </el-form-item>
                </div>
                <div class="el_form">
                  <el-form-item
                    label="企业类型:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">住宿餐饮业</div>
                  </el-form-item>
                  <el-form-item
                    label="所属行业:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">住宿餐饮业</div>
                  </el-form-item>
                </div>
                <div class="el_form">
                  <el-form-item
                    label="所属行业:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">现代中药</div>
                  </el-form-item>
                  <el-form-item
                    label="资质类型:"
                    :label-width="formLabelWidthDetails"
                  >
                    <div class="from_item">中关村高新技术企业</div>
                  </el-form-item>
                </div>
                <el-form-item
                  label="注册资金:"
                  :label-width="formLabelWidthDetails"
                >
                  <div>151,545,656万元</div>
                </el-form-item>
                <el-form-item
                  label="注册地址:"
                  :label-width="formLabelWidthDetails"
                >
                  <div>北京市大兴区黄村火车站55号楼</div>
                </el-form-item>
                <el-form-item
                  label="附件:"
                  :label-width="formLabelWidthDetails"
                >
                  <div>文件名称</div>
                  <div>文件名称</div>
                  <div>文件名称</div>
                  <div>文件名称</div>
                </el-form-item>
              </el-form>
              <div class="head_essential">申报进度</div>
              <div class="head_steps">
                <el-steps :active="active">
                  <el-step title="步骤 1"></el-step>
                  <el-step title="步骤 2"></el-step>
                  <el-step title="步骤 3"></el-step>
                </el-steps>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormCheck = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormCheck = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div></el-tab-pane
      >
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Qualification",
  props: {},
  components: {},
  data() {
    return {
      activeName: "first",
      sreachForm: {},
      tableData: [
        {
          date: "北京科兴中微生物技术有限公司",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      table: {
        height: ""
      },
      dialogVisible: false,
      form: {},
      formLabelWidthDetails: "200px",
      dialogFormCheck: false,
      formLabelWidth: "120px",
      active: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    disposeFun(row) {
      console.log(row);
      this.dialogVisible = true;
    },
    CheckPlanFun(row) {
      console.log(row);
      this.dialogFormCheck = true;
    }
  },
  created() {},
  mounted() {
    let divDom = document.getElementById("alone");
    this.table.height = divDom.offsetHeight - 250;
  }
};
</script>
<style lang="less" scoped>
.operation {
  margin: 5px 0;
}
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
.head_essential {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 10px 50px;
}
.el_form {
  display: flex;
}
.from_item {
  width: 140px;
}
.but {
  margin-right: 10px;
}
.head_steps {
  margin: 30px 0 10px 50px;
}
/deep/ .el-step__icon.is-text {
  cursor: pointer;
}
.dialogDvScroll {
  width: 100%;
  height: 550px;
  overflow: auto;
}
.dialogDvScroll::-webkit-scrollbar {
  display: none;
}
</style>
